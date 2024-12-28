import { useContext } from "react";
import { motion } from "framer-motion";
import { FormContext } from "../context/Context";

const WelcomeHeader = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error("parseJson must be used within a FormProvider");
  }
  const { language, setLanguage } = formContext;


  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  // Inline styles for buttons
  const buttonStyle = () => ({
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    borderRadius: "8px",
    margin: "0 10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  };

  // Inline styles for the flag icons
  const flagStyle = {
    fontSize: "36px", // Increased flag size
    lineHeight: "1",
  };

  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">
        {language === "en" ? "Welcome to Praxis Jung" : "Willkommen bei Praxis Jung"}
      </h1>
      <p className="text-xl text-gray-600">
        {language === "en"
          ? "Please click on the start button to fill out the patient intake form using your voice."
          : "Bitte klicken Sie auf die Starttaste, um das Patientenaufnahmeformular mit Ihrer Stimme auszufüllen."}
      </p>
      <div style={containerStyle}>
        {/* Language Selector Icons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle()}
          onClick={() => handleLanguageChange("en")}
        >
          <span className="fi fi-gb" style={flagStyle}></span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle()}
          onClick={() => handleLanguageChange("de")}
        >
          <span className="fi fi-de" style={flagStyle}></span>
        </motion.button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
