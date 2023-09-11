# React + Vite


#### ➰ Special features and notes to mention:

### ➖ Remove scrolls
To remove ugly scrolls inside divs, use this css tool: .{className}::-webkit-scrollbar {   display: none;   scroll-behavior: smooth; }

### 🎣 useCustomContext hook
 to use/consume context values in any component: 
 create this function at the end of  createContext() file
 ```
 function useYourContextName(){
  const contextValue = useContext(YourContextName)
  if (contextValue ===undefined) throw new Error('YourContextName was used outside of YourContextName Provider')
  return contextValue
}
export {YourContextNameProvider, YourContextName}
```
src/contexts/CitiesContext.jsx

### 🌐 Leaflet 
to use Leaflet for MAP and LOCATIONS use react-leaflet library, copy <Mapcontainer> jsx and import css link from starting files of Leaflet.
create state for map position:
const [mapPosition, setMapPosition] = useState([40, 0]) (any desirable coordinates)

### 📆 Date-picker library

run npm i react-datepicker, import css link from documentation, use <DatePicker /> jsx with 
'onChange' and 'selected' props to set and store date state - const [date, setDate] = useState(new Date()),
also 'dateFormat' attribute to format date- "dd/MM/yyy"
