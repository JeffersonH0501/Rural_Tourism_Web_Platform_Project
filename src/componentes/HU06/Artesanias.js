import React, { useState, useEffect } from "react";
import "./Artesanias.css";
import logo from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from "react-i18next";

const Artesanias = () => {

  const {t, i18n} = useTranslation(["trad"])

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState("");
  const [handicrafts, setHandicrafts] = useState([]);

  const filterOptions = [
    "Price",
    "Quantity",
    "Type",
    "Material",
    "Origin",
    "Available",
  ];

  const types = [
    "embroidery",
    "pottery",
    "macrame",
    "wood carving",
    "beadwork",
    "quilling",
    "candle making",
    "paper quilling",
    "leatherworking",
    "glassblowing",
  ];

  const materials = [
    "cotton",
    "leather",
    "silk",
    "wool",
    "polyester",
    "nylon",
    "denim",
    "velvet",
    "linen",
    "rayon",
  ];
  const origins = [
    "Antioquia",
    "Bogotá D.C.",
    "Valle del Cauca",
    "Cundinamarca",
    "Santander",
    "Atlántico",
    "Norte de Santander",
    "Bolívar",
    "Tolima",
    "Risaralda",
  ];

  useEffect(() => {
    const fetchHandicrafts = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/JuanPabloUni/lab9/main/data2.json"
        );
        const data = await response.json();
        setHandicrafts(data);
      } catch (error) {
        console.error("Error fetching handicrafts:", error);
      }
    };

    fetchHandicrafts();
  }, []);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
      if (value === "Price") {
        setMinPrice("");
        setMaxPrice("");
      } else if (value === "Quantity") {
        setMinQuantity("");
        setMaxQuantity("");
      } else if (value === "Type") {
        setSelectedType("");
      } else if (value === "Material") {
        setSelectedMaterial("");
      } else if (value === "Origin") {
        setSelectedOrigin("");
      } else if (value === "Available") {
        setSelectedAvailable("");
      }
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const isValidPrice = (price) => {
    const regex = /^\d*\.?\d*$/;
    return regex.test(price);
  };

  const filteredHandicrafts = handicrafts.filter((handicraft) => {
    return selectedFilters.every((filter) => {
      switch (filter) {
        case "Price":
          return (
            (!minPrice || isValidPrice(minPrice)) &&
            (!maxPrice || isValidPrice(maxPrice)) &&
            (!minPrice || handicraft.price >= parseFloat(minPrice)) &&
            (!maxPrice || handicraft.price <= parseFloat(maxPrice))
          );
        case "Quantity":
          return (
            (!minQuantity ||
              handicraft.quantity >= parseInt(minQuantity, 10)) &&
            (!maxQuantity || handicraft.quantity <= parseInt(maxQuantity, 10))
          );
        case "Type":
          return (
            !selectedType ||
            handicraft.type.toLowerCase() === selectedType.toLowerCase()
          );
        case "Material":
          return !selectedMaterial || handicraft.material === selectedMaterial;
        case "Origin":
          return !selectedOrigin || handicraft.origin === selectedOrigin;
        case "Available":
          return (
            !selectedAvailable ||
            handicraft.available === (selectedAvailable === "Yes")
          );
        default:
          return true;
      }
    });
  });

  return (
    <div className="artesanias-containerA">
      {/* Header */}
      <header className="headerA">
        <div className="logo-containerA">
          <img src={logo} alt="Logo" className="logoA" />
        </div>
        <div className="title-containerA">
          <h1 className="titleA">{t("HU06-artesanias")}</h1>
        </div>
        <div className="user-info-containerA">
          <span className="usernameA">Juan Pablo Hernández</span>
          {/* Add the icon for user info */}
          <span className="user-iconA">
            <img
              src={require("../../assets/images/usuario.png")}
              alt="User Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </span>
        </div>
      </header>

      <div className="filter-menu-wrapperA">
        {/* Filter menu button */}
        <div className="filter-menu-button-containerA">
          <button
            className="filter-buttonA"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {t("HU06-menufiltro")}
          </button>
        </div>

        {/* Filtering menu */}
        {menuVisible && (
          <div className="filter-menuA">
            {filterOptions.map((option) => (
              <div key={option}>
                {option.trim() === "Price" ? (
                  <div>
                    <label htmlFor="priceCheckbox">
                      <input
                        type="checkbox"
                        id="priceCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <div>
                      <label htmlFor="minPrice">{t("HU06-minprecio")}:</label>
                      <input
                        type="text"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                      <label htmlFor="maxPrice">{t("HU06-maxprecio")}:</label>
                      <input
                        type="text"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                    </div>
                  </div>
                ) : option.trim() === "Quantity" ? (
                  <div>
                    <label htmlFor="quantityCheckbox">
                      <input
                        type="checkbox"
                        id="quantityCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <div>
                      <label htmlFor="minQuantity">{t("HU06-mincantidad")}:</label>
                      <input
                        type="number"
                        id="minQuantity"
                        value={minQuantity}
                        onChange={(e) => setMinQuantity(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                      <label htmlFor="maxQuantity">{t("HU06-maxcantidad")}:</label>
                      <input
                        type="number"
                        id="maxQuantity"
                        value={maxQuantity}
                        onChange={(e) => setMaxQuantity(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                    </div>
                  </div>
                ) : option.trim() === "Type" ? (
                  <div>
                    <label htmlFor="typeCheckbox">
                      <input
                        type="checkbox"
                        id="typeCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="typeSelect"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {types.map((type, index) => (
                        <option key={index} value={type}>
                          {t(type)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "Material" ? (
                  <div>
                    <label htmlFor="materialCheckbox">
                      <input
                        type="checkbox"
                        id="materialCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="materialSelect"
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {materials.map((material, index) => (
                        <option key={index} value={material}>
                          {t(material)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "Origin" ? (
                  <div>
                    <label htmlFor="originCheckbox">
                      <input
                        type="checkbox"
                        id="originCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="originSelect"
                      value={selectedOrigin}
                      onChange={(e) => setSelectedOrigin(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {origins.map((origin, index) => (
                        <option key={index} value={origin}>
                          {origin}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "Available" ? (
                  <div>
                    <label htmlFor="availableCheckbox">
                      <input
                        type="checkbox"
                        id="availableCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="availableSelect"
                      value={selectedAvailable}
                      onChange={(e) => setSelectedAvailable(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      <option value="Yes">{t("si")}</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedFilters.includes(option)}
                      onChange={handleFilterChange}
                    />
                    {t("HU06-" + option)}
                  </label>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid view of handicrafts */}
      <div className="handicrafts-gridA">
        {filteredHandicrafts.length === 0 ? (
          <p>
            {" "}
            <br />
            {t("HU06-noencontrado")}
          </p>
        ) : (
          filteredHandicrafts.map((handicraft) => (
            <div key={handicraft.id} className="handicraft-cardA">
              <img src={handicraft.image} alt={handicraft.name} />
              <h3>{handicraft.name}</h3>
              <p>{t("HU06-Type")}: {t(handicraft.type)}</p>
              <p>{t("HU06-Price")}: ${handicraft.price}</p>
              <p>{t("HU06-Quantity")}: {handicraft.quantity}</p>
              <p>{t("HU06-Material")}: {t(handicraft.material)}</p>
              <p>{t("HU06-Origin")}: {handicraft.origin}</p>
              <p>{t("HU06-Available")}: {handicraft.available ? t("si") : "No"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Artesanias;
