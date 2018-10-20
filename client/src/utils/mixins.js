export function transition({ name, time = 0.2, prop = 'all' }) {
  switch (name) {
    case 'easeOutQuart':
      return `transition: ${prop} ${time}s cubic-bezier(.165, .84, .44, 1)`

    case 'easeInQuart':
      return `transition:${prop} ${time}s cubic-bezier(.895, .03, .685, .22)`

    case 'easeInCubic':
      return `transition: ${prop} ${time}s cubic-bezier(.55, .055, .675, .19)`

    case 'easeOutCubic':
      return `transition: ${prop} ${time}s cubic-bezier(.215, .61, .355, 1)`

    default:
      return ''
  }
}

export function elevation({ level }) {
  switch (level) {
    case 1:
      return 'box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, .7)'
    case 2:
      return 'box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)'
    case 3:
      return 'box-shadow: 0 4px 6px rgba(69, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)'
    case 4:
      return 'box-shadow: 0 15px 35px rgba(69, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)'
    case 5:
      return 'box-shadow: 0px 8px 10px rgba(0, 0, 0, .15), 0px 8px 25px rgba(0, 0, 0, .1)'
    case 6:
      return 'box-shadow: 0 19px 38px rgba(0, 0, 0, .3), 0 15px 12px rgba(0, 0, 0, .22)'
    default:
      return ''
  }
}

const sizes = {
  desktop: 1200,
  tabletLand: 900,
  tabletPort: 750,
  phone: 500,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => `
    @media (max-width: ${sizes[label]}px) {${args}
  }
  `
  return acc
}, {})
