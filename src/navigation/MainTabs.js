import GalinhasStack from './GalinhasStack'

<Tab.Screen
  name="Galinhas"
  component={GalinhasStack}
  options={{
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="chicken" color={color} size={size} />
    ),
  }}
/>
