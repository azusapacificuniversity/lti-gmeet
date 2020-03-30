CREATE TABLE `canvas_lti_google_meets` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `class_id` int(8) NOT NULL,
    `link` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `verification_code` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE(`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

