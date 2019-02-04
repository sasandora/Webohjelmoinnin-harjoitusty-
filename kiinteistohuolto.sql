-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 30, 2018 at 08:34 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiinteistohuolto`
DROP DATABASE IF EXISTS `kiinteistohuolto`;
CREATE DATABASE IF NOT EXISTS `kiinteistohuolto` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `kiinteistohuolto`;

-- --------------------------------------------------------

--
-- Table structure for table `kayttaja`
--

DROP TABLE IF EXISTS `kayttaja`;
CREATE TABLE IF NOT EXISTS `kayttaja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` text,
  `tunnus` varchar(64) NOT NULL,
  `salasana` varchar(64) NOT NULL,
  `taso` int(64) NOT NULL DEFAULT '1',
  `kayntiosoite` text,
  `laskutusosoite` text,
  `puhelinnumero` text,
  `email` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tunnus` (`tunnus`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kayttaja`
--

INSERT INTO `kayttaja` (`id`, `nimi`, `tunnus`, `salasana`, `taso`, `kayntiosoite`, `laskutusosoite`, `puhelinnumero`, `email`) VALUES
(1, NULL, 'super', 'user', 1, NULL, NULL, NULL, NULL),
(9, '', 'eetu', '', 1, NULL, NULL, NULL, NULL),
(16, 'Eetu Käyhkö', 'eetu123', 'qwer', 1, NULL, NULL, NULL, NULL),
(17, 'eetu', 'eetu1234', 'qwert', 1, NULL, NULL, NULL, NULL),
(19, 'eetu', 'eetu12345', 'qwerty', 1, NULL, NULL, NULL, NULL),
(20, 'qwe', 'qwe', 'qwe', 1, NULL, NULL, NULL, NULL),
(21, 'asd', 'asd', 'asd', 1, NULL, NULL, NULL, NULL),
(22, '', '122', 'aa', 1, NULL, NULL, NULL, NULL),
(23, 'Eetu', 'tunnus', '', 1, NULL, NULL, NULL, NULL),
(24, 'Teemu Joni', 'Teemi', '', 1, NULL, NULL, NULL, NULL),
(25, 'Teppo Toimittaja', 'TepiToimija', '', 2, NULL, NULL, NULL, NULL),
(26, 'Tepo', 'yytt', 'yytt', 1, NULL, NULL, NULL, NULL),
(27, 'Orpe Oikarinen', 'Orpe', 'qwer', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tehtava`
--

DROP TABLE IF EXISTS `tehtava`;
CREATE TABLE IF NOT EXISTS `tehtava` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tilaaja` int(11) NOT NULL,
  `kuvaus` text NOT NULL,
  `tilauspvm` date NOT NULL,
  `aloituspvm` date DEFAULT NULL,
  `valmistuspvm` date DEFAULT NULL,
  `hyvaksymispvm` date DEFAULT NULL,
  `kustannusarvio` date DEFAULT NULL,
  `kayteytTunnit` date DEFAULT NULL,
  `tyo` text NOT NULL,
  `kaytetytTarvikkeet` text,
  `status` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tilaaja` (`tilaaja`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tehtava`
--

INSERT INTO `tehtava` (`id`, `tilaaja`, `kuvaus`, `tilauspvm`, `aloituspvm`, `valmistuspvm`, `hyvaksymispvm`, `kustannusarvio`, `kayteytTunnit`, `tyo`, `kaytetytTarvikkeet`, `status`) VALUES
(14, 1, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2018-08-30', NULL, NULL, NULL, NULL, NULL, 'Last House on the Left, The', NULL, 'valmis'),
(15, 1, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\r\n\r\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2017-12-11', NULL, NULL, NULL, NULL, NULL, 'Che: Part Two', NULL, 'hyväksytty'),
(21, 1, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\r\n\r\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2018-07-28', NULL, NULL, NULL, NULL, NULL, 'Sugar & Spice', NULL, 'hyväksytty'),
(24, 1, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2017-12-02', NULL, NULL, NULL, NULL, NULL, 'Narrien illat ', NULL, 'aloitettu'),
(28, 1, 'Käykää pliis lumet pihalta', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'Lumenluonti', NULL, 'aloitettu'),
(29, 23, 'Käykää leikkaamassa nurmi meidän pihalta', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'Nurmen leikkuuta halutaan', NULL, 'aloitettu'),
(30, 23, 'Kylpyhuoneessa vuotaa putket', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'Putkiremontti', NULL, 'hylätty'),
(31, 23, 'teistiä', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'testi', NULL, 'undefined'),
(32, 23, 'testiä vaan', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'toinen testi', NULL, 'tilattu'),
(33, 23, 'Käykää pliis lumet pihalta passaako?', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'Käykää pliis lumet pihalta', NULL, 'undefined'),
(34, 26, 'Ikkunoissa likaa. Peskää kiitos', '2018-11-29', NULL, NULL, NULL, NULL, NULL, 'Ikkunoiden pesua', NULL, 'hyväksytty'),
(35, 27, 'Käykää edes kerran lumet meidän pihalta talven aikana. Ei päästä kohta enää kulkemaan.', '2018-11-30', NULL, NULL, NULL, NULL, NULL, 'Lumenluonti', NULL, 'aloitettu'),
(36, 27, 'Tyhjä', '2018-11-30', NULL, NULL, NULL, NULL, NULL, 'Testi', NULL, 'tilattu');

-- --------------------------------------------------------

--
-- Stand-in structure for view `tehtavanakyma`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `tehtavanakyma`;
CREATE TABLE IF NOT EXISTS `tehtavanakyma` (
`id` int(11)
,`tyo` text
,`kuvaus` text
,`taso` int(64)
,`tilaaja` text
,`tilauspvm` date
,`aloituspvm` date
,`valmistuspvm` date
,`STATUS` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `tehtavanakyma1`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `tehtavanakyma1`;
CREATE TABLE IF NOT EXISTS `tehtavanakyma1` (
`id` int(11)
,`tyo` text
,`kuvaus` text
,`taso` int(64)
,`tilaaja` text
,`tilaajaID` int(11)
,`tilauspvm` date
,`aloituspvm` date
,`valmistuspvm` date
,`STATUS` text
);

-- --------------------------------------------------------

--
-- Structure for view `tehtavanakyma`
--
DROP TABLE IF EXISTS `tehtavanakyma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tehtavanakyma`  AS  select `tehtava`.`id` AS `id`,`tehtava`.`tyo` AS `tyo`,`tehtava`.`kuvaus` AS `kuvaus`,`kayttaja`.`taso` AS `taso`,`kayttaja`.`nimi` AS `tilaaja`,`tehtava`.`tilauspvm` AS `tilauspvm`,`tehtava`.`aloituspvm` AS `aloituspvm`,`tehtava`.`valmistuspvm` AS `valmistuspvm`,`tehtava`.`status` AS `STATUS` from (`tehtava` left join `kayttaja` on((`tehtava`.`tilaaja` = `kayttaja`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `tehtavanakyma1`
--
DROP TABLE IF EXISTS `tehtavanakyma1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tehtavanakyma1`  AS  select `tehtava`.`id` AS `id`,`tehtava`.`tyo` AS `tyo`,`tehtava`.`kuvaus` AS `kuvaus`,`kayttaja`.`taso` AS `taso`,`kayttaja`.`nimi` AS `tilaaja`,`tehtava`.`tilaaja` AS `tilaajaID`,`tehtava`.`tilauspvm` AS `tilauspvm`,`tehtava`.`aloituspvm` AS `aloituspvm`,`tehtava`.`valmistuspvm` AS `valmistuspvm`,`tehtava`.`status` AS `STATUS` from (`tehtava` left join `kayttaja` on((`tehtava`.`tilaaja` = `kayttaja`.`id`))) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tehtava`
--
ALTER TABLE `tehtava`
  ADD CONSTRAINT `tehtava_ibfk_1` FOREIGN KEY (`tilaaja`) REFERENCES `kayttaja` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
