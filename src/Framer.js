import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import './App.scss';
import classNames from 'classnames';

/**
 * This is an example of animating between different components in Framer Motion 2.
 *
 * By wrapping a tree with AnimateSharedLayout, children can be given a layoutId.
 *
 * When a component with a layoutId is removed and a new one with the same layoutId
 * is added elsewhere, the new component will animate from the old one.
 *
 * The outline being animated here is four different components, animated like one.
 */

function Item({ color, isSelected, onClick }) {
  return (
    <li className="item" onClick={onClick} style={{ backgroundColor: color }}>
      {isSelected && (
        <motion.div
          animate={{ borderColor: color }}
          className="outline"
          initial={false}
          layoutId="outline"
          transition={spring}
        />
      )}
    </li>
  );
}

const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

export default function App() {
  const [selected, setSelected] = useState(colors[0]);

  return (
    <div className="App">
      <AnimateSharedLayout>
        <ul>
          {colors.map(color => {
            return (
              <Item
                key={color}
                color={color}
                isSelected={selected === color}
                onClick={() => {
                  return setSelected(color);
                }}
              />
            );
          })}
        </ul>
      </AnimateSharedLayout>
    </div>
  );
}
