import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  keywords?: string[];
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach(line => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    if (key.trim() === 'keywords') {
      (metadata as any)[key.trim()] = value.split(',').map(k => k.trim());
    } else {
      (metadata as any)[key.trim()] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map(file => {
    let filePath = path.join(dir, file);
    let { metadata, content } = readMDXFile(filePath);
    let slug = path.basename(file, path.extname(file));

    let stats = fs.statSync(filePath);
    let lastEdited = stats.mtime.toISOString();

    return {
      metadata: {
        ...metadata,
        lastEdited,
      },
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'posts'));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
