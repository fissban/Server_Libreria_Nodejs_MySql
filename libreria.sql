-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2020 a las 04:23:22
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libreria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `stock` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `gender`, `stock`) VALUES
(1, 'Analisis Matematico 1', 'Utn', 'Manual', 10),
(2, 'Pasteles de naranja', 'Lucia Aguilar', 'Auto Ayuda', 10),
(3, 'Guia Astrologica Para Sobrevivir en la Tierra', 'Astromostra', 'Manual', 99),
(4, 'Romeo y Julieta', 'Utn', 'Manual', 3),
(5, 'Cementerio de Animales', 'Stephen King', 'Terror', 4),
(6, 'El umbral de la noche', 'Stephen King', 'Terror', 54),
(7, 'Node.Js', 'Ismael Lopez Quintero', 'Manual', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `user`, `email`, `password`) VALUES
(1, 'fissban', 'marco.faccio@gmail.com', '659659');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `genders` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`genders`) VALUES
('Auto Ayuda'),
('Drama'),
('Fantasia'),
('Geometria'),
('Historia'),
('Manual'),
('Matematicas'),
('Programacion'),
('Terror');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `dni` int(100) NOT NULL,
  `date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `phone`, `address`, `state`, `city`, `dni`, `date`) VALUES
(1, 'lucia aguilar', 'lucia@gmail.com', '2995952182', 'ameghino 169', 'neuquen', 'plottier', 31289289, '0000-00-00'),
(3, 'aliyah facccio', 'lucia@gmail.com', '2995952182', 'ameghino 169', 'neuquen', 'plottier', 31289281, '2020-08-31'),
(5, 'Marco Faccio', 'marco.faccio@gmail.com', '2995952183', 'Ameghino 169 ', 'Neuquen', 'Plottier', 30967798, '2020-08-31'),
(8, 'Marco Faccio', 'marco.faccio@gmail.com', '31223131', 'Ameghino 169 ', 'Neuquen', 'Plottier', 30967799, '2020-08-31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`genders`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
