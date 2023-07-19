
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialmediaproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountId` bigint(20) NOT NULL,
  `personId` bigint(20) DEFAULT NULL,
  `Pass` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `DateOfCreated` datetime DEFAULT NULL,
  `isActive` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--
-- --------------------------------------------------------
--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `personId` bigint(20) DEFAULT NULL,
  `commentContent` text DEFAULT NULL,
  `postId` bigint(20) DEFAULT NULL,
  `CommentDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `imgId` bigint(20) NOT NULL,
  `imgLink` text DEFAULT NULL,
  `imgsize` int(11) DEFAULT NULL,
  `imgExt` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------
--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `personId` bigint(20) DEFAULT NULL,
  `postId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `personId` bigint(20) NOT NULL,
  `firstName` varchar(25) DEFAULT NULL,
  `middleName` varchar(25) DEFAULT NULL,
  `lastName` varchar(25) DEFAULT NULL,
  `Dob` varchar(10) DEFAULT NULL,
  `DateOfCreated` datetime DEFAULT NULL,
  `imgId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postId` bigint(20) NOT NULL,
  `accountId` bigint(20) DEFAULT NULL,
  `Paragraph` text DEFAULT NULL,
  `DateOfCreated` datetime DEFAULT NULL,
  `imgId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountId`),
  ADD KEY `personId` (`personId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD KEY `personId` (`personId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`imgId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `personId` (`personId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`personId`),
  ADD KEY `imgId` (`imgId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `imgId` (`imgId`),
  ADD KEY `accountId` (`accountId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accountId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `imgId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `personId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `person` (`personId`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `person` (`personId`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `person` (`personId`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`);

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`imgId`) REFERENCES `image` (`imgId`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`imgId`) REFERENCES `image` (`imgId`),
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`accountId`) REFERENCES `account` (`accountId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
