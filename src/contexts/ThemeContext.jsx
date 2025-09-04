import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const backgroundColorLightTheme = "hsla(38, 70%, 84%, 1)";
const backgroundColorDarkTheme = "hsla(271, 53%, 19%, 1)";
const fontColorLightTheme = "hsla(42, 100%, 13%, 1)";
const fontColorDarkTheme = "hsla(42, 100%, 50%, 1)";

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const themes = {
      dark: {
        name: "dark",
        color: fontColorDarkTheme,
        backgroundColor: backgroundColorDarkTheme,
        
      },
      light: {
        name: "light",
        color: fontColorLightTheme,
        backgroundColor: backgroundColorLightTheme,
      },
    };
  
    const [theme, setTheme] = useState(themes.light);
    
      
   
    const changeTheme = () => {
  
      if (theme.name == "light") {
        setTheme(themes.dark);
        localStorage.setItem("theme", "dark");
      } else {
        setTheme(themes.light);
        localStorage.setItem("theme", "light");
      }
    };
  
    useEffect(() => {
      const currentTheme = localStorage.getItem("theme");
  
      if (currentTheme == "light") {
        setTheme(themes.dark);
      } else {
        setTheme(themes.light);
      }
    }, []);
    return (
      <ThemeContext.Provider value={{ theme, changeTheme}}>
        {children}
      </ThemeContext.Provider>
    );
  };