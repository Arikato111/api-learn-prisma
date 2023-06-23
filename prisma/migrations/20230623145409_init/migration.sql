/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `board` (
    `b_id` INTEGER NOT NULL AUTO_INCREMENT,
    `b_name` TEXT NOT NULL,
    `b_date` DATE NOT NULL,
    `usr_id` INTEGER NOT NULL,
    `b_view` INTEGER NOT NULL,
    `cat_id` INTEGER NOT NULL,

    PRIMARY KEY (`b_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `board_detail` (
    `bd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `b_id` INTEGER NOT NULL,
    `bd_name` VARCHAR(200) NOT NULL,
    `bd_date` DATE NOT NULL,
    `usr_id` INTEGER NOT NULL,

    PRIMARY KEY (`bd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(50) NOT NULL,
    `cat_path` VARCHAR(50) NOT NULL,
    `cat_img` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follow` (
    `fol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fol_atk` INTEGER NOT NULL,
    `fol_def` INTEGER NOT NULL,
    `fol_date` DATE NOT NULL,

    PRIMARY KEY (`fol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login_log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `token1` VARCHAR(40) NOT NULL,
    `token2` VARCHAR(40) NOT NULL,
    `usr_id` INTEGER NOT NULL,
    `log_date` DATE NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poll` (
    `poll_id` INTEGER NOT NULL AUTO_INCREMENT,
    `poll_name` VARCHAR(200) NOT NULL,
    `poll_date` DATE NOT NULL,
    `usr_id` INTEGER NOT NULL,
    `poll_view` INTEGER NOT NULL,

    PRIMARY KEY (`poll_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poll_detail` (
    `pd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `poll_id` INTEGER NOT NULL,
    `pd_name` VARCHAR(100) NOT NULL,
    `pd_count` INTEGER NOT NULL,

    PRIMARY KEY (`pd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poll_log` (
    `pl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `poll_id` INTEGER NOT NULL,
    `usr_id` INTEGER NOT NULL,

    PRIMARY KEY (`pl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_detail` TEXT NOT NULL,
    `post_date` DATE NOT NULL,
    `post_usr_id` INTEGER NOT NULL,
    `post_cat_id` INTEGER NOT NULL,
    `post_img` VARCHAR(50) NOT NULL,
    `post_view` INTEGER NOT NULL,

    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_detail` (
    `pd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `pd_name` TEXT NOT NULL,
    `pd_date` DATE NOT NULL,
    `usr_id` INTEGER NOT NULL,

    PRIMARY KEY (`pd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_like` (
    `pl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `usr_id` INTEGER NOT NULL,

    PRIMARY KEY (`pl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usr` (
    `usr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usr_name` VARCHAR(200) NOT NULL,
    `usr_bio` VARCHAR(200) NOT NULL,
    `usr_address` TEXT NOT NULL,
    `usr_date` DATE NOT NULL,
    `usr_email` VARCHAR(100) NOT NULL,
    `usr_tel` VARCHAR(10) NOT NULL,
    `usr_username` VARCHAR(50) NOT NULL,
    `usr_password` VARCHAR(50) NOT NULL,
    `usr_status` VARCHAR(10) NOT NULL,
    `usr_view` INTEGER NOT NULL,
    `usr_regis_date` DATE NOT NULL,
    `usr_img` VARCHAR(50) NOT NULL,
    `google-token` CHAR(30) NULL,

    PRIMARY KEY (`usr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
