# React + Vite


#### ➰ Special features and notes to mention:

### Remove scrolls
To remove ugly scrolls inside divs, use this css tool: .{className}::-webkit-scrollbar {   display: none;   scroll-behavior: smooth; }

### 🎣 useCustomContext hook
 to use/consume context values in any component: 
 ```
 function useYourContextName(){
const contextValue = useContext(YourContextName)
if (contextValue ===undefined) throw new Error('YourContextName was used outside of YourContextName Provider')
return contextValue}
export {YourContextNameProvider, YourContextName}
```
