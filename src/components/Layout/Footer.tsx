import { FC } from 'react';
import classes from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
        <a href="https://nikkipinzon.com" target="_blank" rel="noreferrer">©2023 Nikki Pinzon</a> 
    </footer>
  )
}

export default Footer