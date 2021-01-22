const requireComponents = require.context('@/assets/svg', false, /\.svg$/)
requireComponents.keys().forEach(requireComponents)