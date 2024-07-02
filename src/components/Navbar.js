import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLA/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryItems = categories.map(category => ({
    label: category.name,
    command: () => { window.location = `/categories/${category.id}`; } 
  }));

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const start = (
    <div className="start-container">
      <Link to="/">  
        <img className='logo' src="/logo.png" alt="Logo"/>
      </Link>
    </div>
  );

  const items = [
    {
      label: 'Categorías',
      icon: 'pi pi-fw pi-list',
      items: categoryItems
    },
    {
      label: 'Ofertas',
      icon: 'pi pi-fw pi-tags',
      command: () => { window.location = '/offers' }
    }
  ];

  const end = (
    <div className="end-container">
      <div className="search-container">
        <InputText value={searchValue} onChange={handleSearchChange} placeholder="Buscar productos o categorías" className="navbar-search-input" />
        <Button icon="pi pi-search" className="navbar-search-button p-button-rounded p-button-secondary" />
      </div>
      <Menubar model={[
        {
          label: 'Contactos',
          icon: 'pi pi-fw pi-envelope',
          command: () => { window.location = '/contact' }
        }
      ]} className="contact-menu" />
      <Link to="/cart"> 
        <Button className="cart-button">
          <img src="/carritocompras.png" alt="Carrito" className="cart-icon" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="navbar-wrapper">
      <Menubar model={items} start={start} end={end} className="custom-menubar" />
    </div>
  );
};

export default Navbar;
