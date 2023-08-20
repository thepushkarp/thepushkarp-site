import { useState, useEffect } from 'react'

// Custom hook to detect device type
const useDeviceDetect = () => {
  const [device, setDevice] = useState('desktop')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= 767) {
        setDevice('mobile')
      } else if (width > 767 && width <= 1024) {
        setDevice('tablet')
      } else {
        setDevice('desktop')
      }
    }

    handleResize() // Initial detection
    window.addEventListener('resize', handleResize) // Update on resize

    return () => {
      window.removeEventListener('resize', handleResize) // Cleanup
    }
  }, [])

  return device
}

export default useDeviceDetect
