const carModels = [
  "Toyota Camry",
  "Honda Accord",
  "Ford Fusion",
  "Chevrolet Malibu",
  "Nissan Altima",
  "Hyundai Sonata",
  "Kia Optima",
  "Volkswagen Passat",
  "Subaru Legacy",
  "Mazda6",
  "BMW 3 Series",
  "Mercedes-Benz C-Class",
  "Audi A4",
  "Lexus ES",
  "Volvo S60",
  "Acura TLX",
  "Infiniti Q50",
  "Cadillac CT5",
  "Genesis G70",
  "Tesla Model 3",
  "Ford Mustang",
  "Chevrolet Camaro",
  "Dodge Charger",
  "Nissan Maxima",
  "Honda Civic",
  "Toyota Corolla",
  "Volkswagen Jetta",
  "Subaru Impreza",
  "Kia Forte",
  "Hyundai Elantra",
  "Mazda3",
  "Audi A3",
  "BMW 5 Series",
  "Mercedes-Benz E-Class",
  "Lexus IS",
  "Volvo XC60",
  "Genesis G80",
  "Cadillac CT4",
  "Tesla Model S",
  "Porsche 911",
  "Ford F-150",
  "Chevrolet Silverado",
  "Ram 1500",
  "Toyota Tacoma",
  "Nissan Frontier",
  "Honda Ridgeline",
  "GMC Sierra",
  "Jeep Wrangler",
  "Ford Explorer",
  "Chevrolet Tahoe",
  "Toyota Highlander",
  "Nissan Pathfinder",
  "Honda Pilot",
  "Jeep Grand Cherokee",
  "Kia Sorento",
  "Hyundai Santa Fe",
  "Mazda CX-5",
  "Subaru Outback",
  "BMW X5",
  "Mercedes-Benz GLE",
  "Audi Q5",
  "Lexus RX",
  "Volvo XC90",
  "Genesis GV80",
  "Cadillac XT5",
  "Tesla Model Y",
  "Porsche Cayenne",
  "Ford Escape",
  "Chevrolet Equinox",
  "Toyota RAV4",
  "Honda CR-V",
  "Nissan Rogue",
  "Jeep Cherokee",
  "Kia Sportage",
  "Hyundai Tucson",
  "Mazda CX-9",
  "Subaru Forester",
  "BMW X3",
  "Mercedes-Benz GLC",
  "Audi Q7",
  "Lexus NX",
  "Volvo XC40",
  "Genesis GV70",
  "Cadillac XT4",
  "Tesla Model X",
  "Porsche Macan",
  "Ford Edge",
  "Chevrolet Traverse",
  "Toyota Highlander",
  "Honda Passport",
  "Nissan Murano",
  "Jeep Compass",
  "Kia Telluride",
  "Hyundai Palisade",
  "Mazda CX-30",
  "Subaru Crosstrek",
  "BMW X1",
  "Mercedes-Benz GLB",
  "Audi Q3",
  "Lexus UX",
  "Volvo V60",
  "Genesis G90",
  "Cadillac XT6",
  "Tesla Roadster",
  "Porsche Taycan",
  "Ford Bronco",
  "Chevrolet Blazer",
  "Toyota 4Runner",
  "Honda Pilot",
  "Nissan Armada",
  "Jeep Grand Wagoneer",
  "Kia Carnival",
  "Hyundai Staria",
  "Mazda MX-30",
  "Subaru Solterra",
  "BMW iX",
  "Mercedes-Benz EQB",
  "Audi e-tron",
  "Lexus LF-Z Electrified",
  "Volvo C40 Recharge",
  "Genesis Electrified G80",
  "Cadillac Lyriq",
  "Tesla Cybertruck",
];

export function getRandomCarName() {
  return carModels[Math.floor(Math.random() * carModels.length)];
}

export function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    const hexColor = `#${redHex}${greenHex}${blueHex}`;
  
    return hexColor;
  }


export function rgbToHex(rgbString) {
    const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      return null;
    }

    const red = parseInt(match[1]);
    const green = parseInt(match[2]);
    const blue = parseInt(match[3]);
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
    return hexColor.toUpperCase();
  }