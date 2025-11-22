import React from 'react';
import Supermarket from './Supermarket';
import ChatInterface from './components/ChatInterface';

// Centralized Product Data (exported for use in Chat)
export const PRODUCTS_DATA = [
    // Shelf 1 (Left) - Lettuce & Tomato
    { id: 's1-1', name: 'Lechuga', type: 'sphere', position: [-3, 0.525, -5], texture: 'lettuce', price: 2.50 },
    { id: 's1-2', name: 'Tomate', type: 'sphere', position: [-3, 1.125, -5], texture: 'tomato', price: 3.00 },
    { id: 's1-3', name: 'Lechuga', type: 'sphere', position: [-3, 1.725, -5], texture: 'lettuce', price: 2.50 },
    { id: 's1-4', name: 'Tomate', type: 'sphere', position: [-3, 0.525, -5.4], texture: 'tomato', price: 3.00 },
    { id: 's1-5', name: 'Lechuga', type: 'sphere', position: [-3, 1.125, -5.4], texture: 'lettuce', price: 2.50 },
    { id: 's1-6', name: 'Tomate', type: 'sphere', position: [-3, 1.725, -5.4], texture: 'tomato', price: 3.00 },

    // Shelf 2 (Center) - Lay's Chips
    { id: 's2-1', name: 'Papas Lays', type: 'box', position: [0, 0.525, -5], texture: 'lays', price: 4.50 },
    { id: 's2-2', name: 'Papas Lays', type: 'box', position: [0, 1.125, -5], texture: 'lays', price: 4.50 },
    { id: 's2-3', name: 'Papas Lays', type: 'box', position: [0, 1.725, -5], texture: 'lays', price: 4.50 },
    { id: 's2-4', name: 'Papas Lays', type: 'box', position: [0, 0.525, -5.4], texture: 'lays', price: 4.50 },
    { id: 's2-5', name: 'Papas Lays', type: 'box', position: [0, 1.125, -5.4], texture: 'lays', price: 4.50 },
    { id: 's2-6', name: 'Papas Lays', type: 'box', position: [0, 1.725, -5.4], texture: 'lays', price: 4.50 },

    // Shelf 3 (Right) - Mixed
    { id: 's3-1', name: 'Tomate', type: 'sphere', position: [3, 0.525, -5], texture: 'tomato', price: 3.00 },
    { id: 's3-2', name: 'Lechuga', type: 'sphere', position: [3, 1.125, -5], texture: 'lettuce', price: 2.50 },
    { id: 's3-3', name: 'Papas Lays', type: 'box', position: [3, 1.725, -5], texture: 'lays', price: 4.50 },
    { id: 's3-4', name: 'Tomate', type: 'sphere', position: [3, 0.525, -5.4], texture: 'tomato', price: 3.00 },
    { id: 's3-5', name: 'Lechuga', type: 'sphere', position: [3, 1.125, -5.4], texture: 'lettuce', price: 2.50 },
    { id: 's3-6', name: 'Papas Lays', type: 'box', position: [3, 1.725, -5.4], texture: 'lays', price: 4.50 },
];

const SupermarketWithChat = () => {
    return (
        <>
            <Supermarket productsData={PRODUCTS_DATA} />
            <ChatInterface products={PRODUCTS_DATA} />
        </>
    );
};

export default SupermarketWithChat;
