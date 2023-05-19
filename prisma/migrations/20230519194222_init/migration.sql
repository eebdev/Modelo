/*
  Warnings:

  - You are about to alter the column `station_name` on the `contract_station` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `station_name` on the `geolocation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `station_name` on the `missing_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `datetime` on the `missing_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `station_name` on the `nearestlocation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `station` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `station_name` on the `station_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `datetime` on the `station_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - The primary key for the `station_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `station_name` on the `station_status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `last_response` on the `station_status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `station_name` on the `subscription_station` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `temp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dewp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visib` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wdsp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prcp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sndp` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frshtt` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cldc` on table `station_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wnddir` on table `station_data` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `contract_station` MODIFY `station_name` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `geolocation` ADD COLUMN `countryCountry_code` VARCHAR(191) NULL,
    ADD COLUMN `stationName` INTEGER NULL,
    MODIFY `station_name` INTEGER NOT NULL,
    MODIFY `island` VARCHAR(191) NULL,
    MODIFY `county` VARCHAR(191) NULL,
    MODIFY `place` VARCHAR(191) NULL,
    MODIFY `hamlet` VARCHAR(191) NULL,
    MODIFY `town` VARCHAR(191) NULL,
    MODIFY `municipality` VARCHAR(191) NULL,
    MODIFY `state_district` VARCHAR(191) NULL,
    MODIFY `administrative` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `village` VARCHAR(191) NULL,
    MODIFY `region` VARCHAR(191) NULL,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `locality` VARCHAR(191) NULL,
    MODIFY `postcode` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `missing_data` MODIFY `station_name` INTEGER NOT NULL,
    MODIFY `datetime` DATETIME(3) NOT NULL,
    MODIFY `temp` DECIMAL(65, 30) NULL,
    MODIFY `dewp` DECIMAL(65, 30) NULL,
    MODIFY `stp` DECIMAL(65, 30) NULL,
    MODIFY `slp` DECIMAL(65, 30) NULL,
    MODIFY `visib` DECIMAL(65, 30) NULL,
    MODIFY `wdsp` DECIMAL(65, 30) NULL,
    MODIFY `prcp` DECIMAL(65, 30) NULL,
    MODIFY `sndp` DECIMAL(65, 30) NULL,
    MODIFY `cldc` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `nearestlocation` ADD COLUMN `countryCountry_code` VARCHAR(191) NULL,
    ADD COLUMN `stationName` INTEGER NULL,
    MODIFY `station_name` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `station` DROP PRIMARY KEY,
    MODIFY `name` INTEGER NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `station_data` MODIFY `station_name` INTEGER NOT NULL,
    MODIFY `datetime` DATETIME(3) NOT NULL,
    MODIFY `temp` DECIMAL(65, 30) NOT NULL,
    MODIFY `dewp` DECIMAL(65, 30) NOT NULL,
    MODIFY `stp` DECIMAL(65, 30) NOT NULL,
    MODIFY `slp` DECIMAL(65, 30) NOT NULL,
    MODIFY `visib` DECIMAL(65, 30) NOT NULL,
    MODIFY `wdsp` DECIMAL(65, 30) NOT NULL,
    MODIFY `prcp` DECIMAL(65, 30) NOT NULL,
    MODIFY `sndp` DECIMAL(65, 30) NOT NULL,
    MODIFY `frshtt` VARCHAR(191) NOT NULL,
    MODIFY `cldc` DECIMAL(65, 30) NOT NULL,
    MODIFY `wnddir` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `station_status` DROP PRIMARY KEY,
    MODIFY `station_name` INTEGER NOT NULL,
    MODIFY `last_response` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`station_name`);

-- AlterTable
ALTER TABLE `subscription_station` MODIFY `station_name` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_geolocation_station_name` ON `geolocation`(`station_name`);

-- CreateIndex
CREATE INDEX `fk_geolocation_country_code` ON `geolocation`(`country_code`);

-- CreateIndex
CREATE INDEX `fk_nearestlocation_station_name` ON `nearestlocation`(`station_name`);

-- CreateIndex
CREATE INDEX `fk_nearestlocation_country_code` ON `nearestlocation`(`country_code`);

-- AddForeignKey
ALTER TABLE `geolocation` ADD CONSTRAINT `geolocation_countryCountry_code_fkey` FOREIGN KEY (`countryCountry_code`) REFERENCES `country`(`country_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `geolocation` ADD CONSTRAINT `geolocation_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nearestlocation` ADD CONSTRAINT `nearestlocation_countryCountry_code_fkey` FOREIGN KEY (`countryCountry_code`) REFERENCES `country`(`country_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nearestlocation` ADD CONSTRAINT `nearestlocation_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `station_data` ADD CONSTRAINT `station_data_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missing_data` ADD CONSTRAINT `missing_data_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription_station` ADD CONSTRAINT `subscription_station_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscription`(`subscription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription_station` ADD CONSTRAINT `subscription_station_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract_station` ADD CONSTRAINT `contract_station_contract_id_fkey` FOREIGN KEY (`contract_id`) REFERENCES `contract`(`contract_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract_station` ADD CONSTRAINT `contract_station_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `station_status` ADD CONSTRAINT `station_status_station_name_fkey` FOREIGN KEY (`station_name`) REFERENCES `station`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
