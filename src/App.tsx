import { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Switch,
  useDisclosure
} from "@nextui-org/react";
import { MoonIcon } from "./assets/icons/Moonicon";
import { SunIcon } from "./assets/icons/Moonicon"; // Cambié el nombre de importación

export const App = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Nuevo estado para el modo oscuro
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchWeather = async () => {
    try {
      const apiKey = '273f270dbd21528580a52ed876f244d9';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
      if (!response.ok) {
        setCity("");
        throw new Error('No se pudo encontrar la ciudad');
      }
    const data = await response.json();
      setWeatherData(data);
      onOpen();
      setCity("");
    } catch (error) {
      alert('Escriba la ciudad');
    }
  };

  const getWeatherIcon = () => {
    switch (weatherData.weather[0].icon) {
      case '01d':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg';
      case '01n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/night.svg';
      case '02d':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg';
      case '02n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-night-1.svg';
      case '03d':
      case '03n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg';
      case '04d':
      case '04n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg';
      case '09d':
      case '09n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-5.svg';
      case '10d':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-6.svg';
      case '10n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg';
      case '11d':
      case '11n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg';
      case '13d':
      case '13n':
        return 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg';
      default:
        return '/animated-icons/default.svg';
    }
  };

  useEffect(() => {
    // Manejar el cambio de thema de claro a oscuro
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}>

    <Switch
        className='cambio'
        isSelected={isDarkMode}
        size="lg"
        color="default"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
        onChange={() => setIsDarkMode(!isDarkMode)} // Cambia el estado del tema
      >
      </Switch>
        <h1>Buscar el Clima según la ciudad</h1>
        <Input
          type="text"
          placeholder="Ingresa el nombre de la ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <Button className="boton" type="submit">Buscar</Button>
      </form>

      {weatherData && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="header flex flex-col gap-1"><h2>{weatherData.name}</h2></ModalHeader>
                <ModalBody>
                  <p>Temperatura: {weatherData.main.temp} °C</p>
                  <p>Descripción: {weatherData.weather[0].description}</p>
                  <img
                    className='img'
                    src={getWeatherIcon()}
                    alt={weatherData.weather[0].description}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
