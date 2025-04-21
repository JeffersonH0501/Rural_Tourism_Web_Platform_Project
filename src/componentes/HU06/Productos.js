import React, { useState, useEffect } from "react";
import "./Productos.css";
import logo from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from "react-i18next";

const Productos = () => {

  const {t, i18n} = useTranslation(["trad"])

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState("");
  const [products, setProducts] = useState([]);

  const filterOptions = [
    "Price",
    "Quantity",
    "Type",
    "Season",
    "Origin",
    "Available",
  ];

  const types = [
    "Fruits",
    "Vegetables",
    "Grains",
    "Dairy Products",
    "Meat",
    "Poultry",
    "Seafood",
    "Nuts",
    "Herbs",
    "Spices",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/JuanPabloUni/lab9/main/data0.json"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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
      } else if (value === "Season") {
        setSelectedSeason("");
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

  const filteredProducts = products.filter((product) => {
    return selectedFilters.every((filter) => {
      switch (filter) {
        case "Price":
          return (
            (!minPrice || isValidPrice(minPrice)) &&
            (!maxPrice || isValidPrice(maxPrice)) &&
            (!minPrice || product.price >= parseFloat(minPrice)) &&
            (!maxPrice || product.price <= parseFloat(maxPrice))
          );
        case "Quantity":
          return (
            (!minQuantity || product.quantity >= parseInt(minQuantity, 10)) &&
            (!maxQuantity || product.quantity <= parseInt(maxQuantity, 10))
          );
        case "Type":
          return (
            !selectedType ||
            product.type.toLowerCase() === selectedType.toLowerCase()
          );
        case "Season":
          return !selectedSeason || product.season === selectedSeason;
        case "Origin":
          return !selectedOrigin || product.origin === selectedOrigin;
        case "Available":
          return (
            !selectedAvailable ||
            product.available === (selectedAvailable === "Yes")
          );
        default:
          return true;
      }
    });
  });

  return (
    <div className="productos-containerP">
      {/* Header */}
      <header className="headerP">
        <div className="logo-containerP">
          <img src={logo} alt="Logo" className="logoP" />
        </div>
        <div className="title-containerP">
          <h1 className="titleP">{t("HU06-productosagricolas")}</h1>
        </div>
        <div className="user-info-containerP">
          <span className="usernameP">Juan Pablo Hernández</span>
          {/* Add the icon for user info */}
          <span className="user-iconP">
            <img
              src={require("../../assets/images/usuario.png")}
              alt="User Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </span>
        </div>
      </header>

      <div className="filter-menu-wrapperP">
        {/* Filter menu button */}
        <div className="filter-menu-button-containerP">
          <button
            className="filter-buttonP"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {t("HU06-menufiltro")}
          </button>
        </div>

        {/* Filtering menu */}
        {menuVisible && (
          <div className="filter-menuP">
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
                ) : option.trim() === "Season" ? (
                  <div>
                    <label htmlFor="seasonCheckbox">
                      <input
                        type="checkbox"
                        id="seasonCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="seasonSelect"
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {t(month)}
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

      {/* Grid view of agricultural products */}
      <div className="products-gridP">
        {filteredProducts.length === 0 ? (
          <p>
            {" "}
            <br />
            {t("HU06-noencontrado")}
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-cardP">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{t("HU06-Type")}: {t(product.type.charAt(0).toUpperCase() + product.type.slice(1))}</p>
              <p>{t("HU06-Price")}: ${product.price}</p>
              <p>{t("HU06-Quantity")}: {product.quantity}</p>
              <p>{t("HU06-Season")}: {t(product.season)}</p>
              <p>{t("HU06-Origin")}: {product.origin}</p>
              <p>{t("HU06-Available")}: {product.available ? t("si") : "No"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;
