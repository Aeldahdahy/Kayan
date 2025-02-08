-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2025 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kayandb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
(11, 'Shahd_Admin', '$2b$10$3VkfmoWTWUO2vcYinD/lGOWgL.kc2Ey3nB.3FYDLmb2k69ILX05f2'),
(12, 'AhmedAmr_Admin', '$2b$10$KrC/.9wZ0FtRVRjg4Q78CO0lOic7Y9.Faq30n6x/UtOJyfDDQN6mG');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `brand_country` varchar(255) NOT NULL,
  `brand_logo` varchar(255) NOT NULL,
  `language` enum('en','ar') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`, `brand_country`, `brand_logo`, `language`) VALUES
(1, 'Burger', 'Oman', '/uploads/brands/1736870471232-1967-Ford-Shelby-Mustang-GT500-001-1080.jpg', 'en'),
(2, 'Giffe cusine Gieffe', 'Oman', '/uploads/brands/1736870552383-05_forza7_porsche_gt2rs_05_4k.jpg', 'en'),
(3, 'Elba', 'Oman', '/uploads/brands/1736870565822-2022-BMW-M5-CS-007-1080.jpg', 'en'),
(4, 'Elica', 'Oman', '/uploads/brands/1736870577660-2001-Toyota-Supra-The-Fast-and-the-Furious-006-1080.jpg', 'en'),
(5, 'Lieheir', 'Oman', '/uploads/brands/1736870588523-2011-Lexus-LFA-005-1080.jpg', 'en'),
(6, 'Fresh', 'Oman', '/uploads/brands/1736870599550-1991-Mazda-RX-7-004-1080.jpg', 'en'),
(7, 'LDYLUIM', 'Oman', '/uploads/brands/1736870614875-2011-Shelby-Classic-Recreations-GT500CR-003-1080.jpg', 'en'),
(8, 'Lamborghini', 'Oman', '/uploads/brands/1736870528154-1990-Mercedes-Benz-190E-Evolution-II-004-1080.jpg', 'en'),
(9, 'Kumtel', 'Oman', '/uploads/brands/1736870627673-1967-Toyota-2000GT-005-1080.jpg', 'en'),
(25, 'Nageh TEX', 'Oman', '/uploads/brands/1736873568206-Logo-Final-White-300x60.png', 'en'),
(26, 'GLC', 'Oman', '/uploads/brands/1736874915638-logo.png', 'en');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `language` enum('en','ar') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `language`) VALUES
(1, 'Furniture', 'en'),
(2, 'Wardrobe', 'en'),
(3, 'Home appliances', 'en'),
(4, 'Bathroom units', 'en'),
(5, 'Sinks & MiXers', 'en'),
(6, 'Tubes', 'en'),
(14, 'Textile', 'en'),
(15, 'Paint', 'en'),
(16, 'أثاث', 'ar'),
(17, 'خزانة الملابس', 'ar'),
(18, 'الأجهزة المنزلية', 'ar'),
(19, 'وحدات الحمام', 'ar'),
(20, 'المصارف والخلاطات', 'ar'),
(21, 'أحواض', 'ar'),
(22, 'المنسوجات', 'ar'),
(23, 'الدهانات', 'ar');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_sale` varchar(255) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `language` enum('en','ar') NOT NULL,
  `admin_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `product_sale`, `stock_quantity`, `language`, `admin_id`, `sub_category_id`, `brand_id`) VALUES
(27, 'LAGUNA', 'The oak wood of the briccole from the Venetian lagoon have been framed in a sober and rational design.Contemporary spirit and timeless beauty: every Laguna door is a unique piece, an unparalleled and lively gem that tells the ancient story of Italian magn', '0', 1, 'en', 12, 26, 2),
(28, 'لودوس', 'لعبة راقية تجمع بين التأثيرات البصرية والمادية غير العادية وأفضل تصميم معاصر: يترجم مطبخ لودوس الباب المؤطر، ويقترحه في مجموعة واسعة من اللمسات النهائية المطلية غير اللامعة واللامعة، واللؤلؤية والمعدنية. يكمل اختيار المقابض إمكانية التخصيص.\r\nباب بارز على ', '0', 1, 'ar', 12, 47, 2),
(29, 'ESSENTIA', 'Each Essentia kitchen sings a special and unrepeatable story written mysteriously on its doors. Each node of the oak is a natural calligraphy that enchants the view and leads into the wild woods and the great landscapes of Northern Europe, telling the uni', '0', 1, 'en', 12, 26, 2),
(30, 'ايسينتيا', 'تغني كل مطبخ من مطابخ Essentia قصة خاصة لا تتكرر مكتوبة بطريقة غامضة على أبوابها. كل عقدة من خشب البلوط عبارة عن خط طبيعي يسحر المنظر ويقود إلى الغابات البرية والمناظر الطبيعية الرائعة في شمال أوروبا، ويحكي تفرد كل تركيبة.\r\nباب من خشب البلوط من Rovere Ant', '0', 1, 'ar', 12, 47, 2),
(31, 'NICE', 'Model Nice is the ultimate kitchen’s expression of aesthetic versatility. Framed doors with a contemporary spirit are available in 38 glossy and matt lacquered finishes. Wood lovers can choose from 10 oak essences with beautiful natural grain.\r\nOak framed', '0', 1, 'en', 12, 26, 2),
(32, 'نيس', 'موديل Nice هو التعبير النهائي للمطبخ عن التنوع الجمالي. الأبواب المؤطرة بروح معاصرة متوفرة في 38 لمسة نهائية لامعة وغير لامعة. يمكن لعشاق الخشب الاختيار من بين 10 أنواع من خشب البلوط ذات الحبوب الطبيعية الجميلة.\r\nباب مؤطر من خشب البلوط من ROVERE CAFFE’ وم', '0', 1, 'ar', 12, 47, 2),
(33, 'victory ', 'The exclusive aesthetics of a victory kitchen are expressed in the different shades of the ash essence of doors. The unique detail is the antique iron decoration that crosses on the flat middle panel for both simple and glass doors.\r\nAsh framed door in fr', '0', 1, 'en', 12, 26, 2),
(34, 'فكتوري', 'تتجلى الجماليات الحصرية لمطبخ النصر في ظلال مختلفة من جوهر خشب الدردار للأبواب. التفصيل الفريد هو الزخرفة الحديدية العتيقة التي تتقاطع على اللوحة الوسطى المسطحة لكل من الأبواب البسيطة والزجاجية.\r\nباب بإطار من خشب الدردار من فراسينو موشيو وفراسينو لوتو\r\nجز', '0', 1, 'ar', 12, 47, 2),
(35, 'STEEL', 'The genius and perfection of steel expressed in only one finish: modern taste, industrial style, futuristic spirit, minimalist aesthetic, changing visual effect. The Steel kitchen enhances the pure charm of steel in combination with sophisticated wood or ', '0', 1, 'en', 12, 26, 2),
(36, 'ستييل', 'إن عبقرية وكمال الفولاذ يتجلى في لمسة نهائية واحدة فقط: الذوق الحديث، والأسلوب الصناعي، والروح المستقبلية، والجماليات البسيطة، والتأثير البصري المتغير. يعزز المطبخ الفولاذي السحر الخالص للفولاذ عند دمجه مع الأبواب الخشبية أو المطلية بالورنيش. تناغم لا تشو', '0', 1, 'ar', 12, 47, 2),
(37, 'castanea', 'he framed door of castanea, in four different finishes, surprises for its versatility. Furnish with style even modern location, both with traditional leg cipolla, plinth matching door’s color.\r\nChestnut framed door in castagno invecchiato\r\n- door matt lac', '0', 1, 'en', 12, 26, 2),
(38, 'الكاستانيا', 'باب مؤطر من خشب الكاستانيا، بأربعة تشطيبات مختلفة، يفاجئك بتعدد استخداماته. يمكنك تأثيثه بأناقة حتى في الموقع الحديث، مع ساق تقليدية من خشب الكاستانيا، وقاعدة تتناسب مع لون الباب.\r\nباب مؤطر من خشب الكاستانيا\r\n- باب مطلي بلون كريمي غير لامع RAL 9001\r\nغطاء ', '0', 1, 'ar', 12, 47, 2),
(39, 'JAY', 'It enhances the value of simple styling and logical functionality. It enhances the value of beguiling finishes and spaces. It enhances the concept of a dynamic kitchen. Games of colours, of materials and of shapes for endless creativity. Volumes in motion', '0', 1, 'en', 12, 26, 2),
(40, 'جاي', 'إنه يعزز قيمة التصميم البسيط والوظائف المنطقية. إنه يعزز قيمة التشطيبات والمساحات الجذابة. إنه يعزز مفهوم المطبخ الديناميكي. ألعاب الألوان والمواد والأشكال لإبداع لا نهاية له. أحجام متحركة تجعل مطبخك فريدًا حقًا. يتميز هذا المطبخ بتصميم بسيط وجذاب ولكنه ش', '0', 1, 'ar', 12, 47, 2),
(41, 'LESMO', 'Contemporary, sophisticated, brilliant. The kitchen opens up new horizons for functionality, ready to be a classy place for your own particular lifestyle. Have fun mixing and matching patterns and colours, discover contrasting combinations with a strong p', '0', 1, 'en', 12, 26, 2),
(42, 'ليسمو', 'معاصر، متطور، لامع. يفتح المطبخ آفاقًا جديدة للوظائف، جاهزًا ليكون مكانًا راقيًا لأسلوب حياتك الخاص. استمتع بمزج ومطابقة الأنماط والألوان، واكتشف مجموعات متناقضة بشخصية قوية. حوار متطور بين أجود المواد، لمساحة تفيض بالدفء. مطبخ بتصميم جذاب شديد التحمل، بأ', '0', 1, 'ar', 12, 47, 2),
(43, 'LESMO CULT', 'From the absolutely handmade production of each door to the shaped handle created according project: every Lesmo Cult kitchen is an unrepeatable masterpiece in which “Made in Italy” finds a unique and perfectly balanced furnishing solution between aesthet', '0', 1, 'en', 12, 26, 2),
(44, 'ليسمو كالت', 'من الإنتاج اليدوي المطلق لكل باب إلى المقبض المصمم وفقًا للمشروع: كل مطبخ Lesmo Cult هو تحفة فنية لا تتكرر حيث يجد \"صنع في إيطاليا\" حلاً أثاثًا فريدًا ومتوازنًا تمامًا بين الجودة الجمالية والوظائف القصوى.\r\nباب باللون الأحمر العتيق - باب مطلي بالورنيش غير ', '0', 1, 'ar', 12, 47, 2),
(45, 'MIRROR', 'The Mirror kitchen is a magical geometry cleverly constructed between reflection effects, elegance and fine finishes: the selection of ceramic, glass and aluminum fronts evolves the traditional concept of \"furnishing\", designing contemporary atmospheres i', '0', 1, 'en', 12, 26, 2),
(46, 'ميرور', 'المطبخ المرآة هو هندسة سحرية تم بناؤها بذكاء بين تأثيرات الانعكاس والأناقة واللمسات النهائية الرائعة: إن اختيار الواجهات الخزفية والزجاجية والألمنيوم يطور المفهوم التقليدي لـ \"التأثيث\"، ويصمم أجواء معاصرة حيث ينعكس المنزل في عناصر المطبخ نفسه.', '0', 1, 'ar', 12, 47, 2),
(47, 'PUNTO', 'Punto transforms the home environment by evolving the concept of linearity, cleanliness and practicality of living environments. There are three characteristic functional elements: the disap-pearance of the external handles in favor of the groove handle; ', '0', 1, 'en', 12, 26, 2),
(48, 'بونتو', 'تحول Punto بيئة المنزل من خلال تطوير مفهوم الخطية والنظافة والعملية لبيئات المعيشة. هناك ثلاثة عناصر وظيفية مميزة: اختفاء المقابض الخارجية لصالح مقبض الأخدود ؛ العناصر \"الحية\" التي تعمل على توسيع وتعزيز منطق المساحة المفتوحة ، مما يخلق بيئات منسقة ومتماسك', '0', 1, 'ar', 12, 47, 2),
(49, 'SFERA', 'Linear and rational volumes, essential shapes proposed in 6 lacquered colors with direct polish spread. A durable and long-lived kitchen made with MDF panel, white melamine plated on both sides, 4 ABS edges, glossy lacquer on 1 side and 4 edges. Interior ', '0', 1, 'en', 12, 26, 2),
(50, 'سيفرا', 'أحجام خطية وعقلانية، أشكال أساسية مقترحة بستة ألوان مطلية بطبقة تلميع مباشرة. مطبخ متين وطويل العمر مصنوع من لوح MDF، مطلي بالميلامين الأبيض على كلا الجانبين، 4 حواف ABS، ورنيش لامع على جانب واحد و4 حواف. الجزء الداخلي مطلي دائمًا بالميلامين الأبيض. اختفا', '0', 1, 'ar', 12, 47, 2),
(51, 'ALTEA', 'This kitchen is built to stand the test of time without ever tiring you. Its components retain old-style appeal and styling so you don’t need to relinquish the convenience of modern life. Rigorous shapes welcome you, providing all the comfort and practica', '0', 1, 'en', 12, 26, 2),
(52, 'التيا', 'تم تصميم هذا المطبخ ليتحمل اختبار الزمن دون أن يتعبك أبدًا. تحتفظ مكوناته بجاذبية الطراز القديم والأناقة حتى لا تضطر إلى التخلي عن راحة الحياة العصرية. ترحب بك الأشكال الصارمة، وتوفر لك كل الراحة والعملية التي تحتاجها في المطبخ. ليلاً أو نهارًا، هو دائمًا', '0', 1, 'ar', 12, 47, 2),
(53, 'Foster 7135 081 Built-In Electric Oven 60 cm', 'The range of Foster ovens and coordinated products makes it possible to find the perfect solution for every space requirement. Combining stainless steel and glass, the oven offers 34 litres of capacity and 8 cooking functions, including touch controls and', '0', 1, 'en', 12, 12, 3),
(54, 'Foster 7135 081 Built-In Electric Oven 60 cm', ' The range of Foster ovens and coordinated products makes it possible to find the perfect solution for every space requirement. Combining stainless steel and glass, the oven offers 34 litres of capacity and 8 cooking functions, including touch controls an', '0', 1, 'en', 12, 12, 3),
(55, 'Elba ELIO GIANT G92 ICK Built-In Gas Oven 90 cm', 'Imagine an oven with no space limits and even more cooking possibilities. The Elio Giant fan gas oven offers a huge space, more power, and greater performance. A maxi cavity of 106 usable liters, 10 functions, and gas grill with independent controls ensur', '0', 1, 'en', 12, 12, 3),
(56, 'فرن غاز مدمج Elba ELIO GIANT G92 ICK 90 سم', 'تخيل فرنًا بلا حدود للمساحة وإمكانيات طهي أكبر. يوفر فرن الغاز المروحي Elio Giant مساحة ضخمة وقوة أكبر وأداءً أفضل. تجويف ماكسي بسعة 106 لترات قابلة للاستخدام، و10 وظائف، وشواية غاز مع عناصر تحكم مستقلة تضمن طهيًا دقيقًا ومرنًا.\r\n\r\nيشتمل هذا المنتج على:\r\n', '0', 1, 'ar', 12, 42, 3),
(57, 'فرن غاز مدمج Elba ELIO GIANT G92 ICK مقاس 60 سم', 'تخيل فرنًا بلا حدود للمساحة وإمكانيات طهي أكبر. يوفر فرن الغاز المروحي Elio Giant مساحة ضخمة وقوة أكبر وأداءً أفضل. تجويف ماكسي بسعة 106 لترات قابلة للاستخدام، و10 وظائف، وشواية غاز مع عناصر تحكم مستقلة تضمن', '0', 1, 'ar', 12, 42, 3),
(58, 'Elba ALTERUM 109-50 XN Built-In Gas Oven 90 cm', 'An elegant and sober stainless steel design characterizes this Alterum Collection oven. With its simple, minimalist lines, it serves as a refined addition to your kitchen space. The 109-50 XN gas oven offers 4 functions and a 78-liter usable cavity, featu', '0', 1, 'en', 12, 12, 3),
(59, 'إلبا ألتروم 109-50 XN فرن غاز بلت ان 90 سم', 'يتميز هذا الفرن من مجموعة Alterum بتصميم أنيق ورصين من الفولاذ المقاوم للصدأ. بفضل خطوطه البسيطة، يعمل كإضافة راقية لمساحة مطبخك. يوفر فرن الغاز 109-50 XN 4 وظائف وتجويفًا قابلاً للاستخدام بسعة 78 لترًا، ويتميز بتقنيات متقدمة مثل الشواية الدوارة وشواية ال', '0', 1, 'ar', 12, 42, 3),
(60, 'Foster 7300 000 Induction Hob', '\"Induction cooker hob part of Foster Aesthetica collection, which highlights and enhances the details of each object and represents the synthesis of the love for artistic beauty that distinguishes Foster design. The materials and shapes tell us a story an', '0', 1, 'en', 12, 9, 3),
(61, 'فوستر 7300 000 موقد حثي', '\"موقد الطهي الحثي جزء من مجموعة Foster Aesthetica، والذي يسلط الضوء على تفاصيل كل شيء ويعززها ويمثل توليف حب الجمال الفني الذي يميز تصميم Foster. تحكي لنا المواد والأشكال قصة وينقل كل لون تصورات مختلفة.\"\r\n\r\nتتمتع مواقد الطهي الحثي من Foster بميزات عالية ا', '0', 1, 'ar', 12, 39, 3),
(62, 'Elica NIKOLATESLA UNPLUGGED Extractor Hob', 'Designed by Fabrizio Crisa, NikolaTesla Unplugged is Elica’s new proposal, marking a further turning point in the aesthetics, features, and usage of extractor hobs. This meticulously designed extractor hob offers a wide range of high-tech features for gua', '0', 1, 'en', 12, 9, 3),
(63, 'شفاط مطبخ إيليكا نيكولاتيسلا غير موصول بالكهرباء', 'تم تصميم موقد نيكولا تيسلا أونبلجد بواسطة فابريزيو كريسا، وهو اقتراح جديد من شركة إليكا، ويمثل نقطة تحول أخرى في جماليات وميزات واستخدامات مواقد الشفاط. يوفر موقد الشفاط المصمم بدقة مجموعة واسعة من الميزات عالية التقنية لضمان نتائج طهي رائعة.\r\n\r\nالمميزات:', '0', 1, 'ar', 12, 39, 3),
(64, 'Foster QUADRA 7365 040 Modular Configuration Induction Hob', '4 zone modular system with free positioning on the work surface that allows freedom of design in your kitchen.\"\r\n\r\nFoster Modular Induction Systems bring high-tech features to improve performance and security:\r\n• Powerboost: Booster function provides incr', '0', 1, 'en', 12, 9, 3),
(65, 'موقد حثي Foster QUADRA 7365 040 بتكوين معياري', 'نظام وحدات مكون من 4 مناطق مع وضع حر على سطح العمل يسمح بحرية التصميم في مطبخك.\"\r\n\r\nتوفر أنظمة الحث المعيارية من فوستر ميزات عالية التقنية لتحسين الأداء والأمان:\r\n• Powerboost: توفر وظيفة Booster طاقة متزايدة للطبق المحدد. عند تنشيطها، تعمل اللوحة لمدة عش', '0', 1, 'ar', 12, 39, 3),
(66, 'Algor AG506MWBKS Built-In Microwave 50L', 'The Algor AG506MWBKS multi-functional microwave oven/grill, with a 50-liter capacity and stainless steel design, is perfect for cooking, heating, and grilling. Its extensive features and 13 functions provide versatility and precision in food preparation.\r', '0', 1, 'en', 12, 16, 3),
(67, 'Algor AG506MWBKS ميكروويف مدمج سعة 50 لتر', 'فرن الميكروويف/الشواية متعدد الوظائف Algor AG506MWBKS بسعة 50 لترًا وتصميم من الفولاذ المقاوم للصدأ، مثالي للطهي والتسخين والشواء. توفر ميزاته الواسعة ووظائفه الـ13 تنوعًا ودقة في تحضير الطعام.\r\n\r\nالمميزات:\r\n• 13 وظيفة متعددة الوظائف\r\n• سعة 50 لترًا\r\n• 5 ', '0', 1, 'ar', 12, 46, 3),
(68, 'Elba 220-00BK Wall Unit Built-In Microwave Oven 22L', 'The Elba 220-00BK built-in microwave oven offers maximum practicality in a compact design, featuring a 22-liter capacity that seamlessly integrates into your kitchen. With a sleek black finish, this microwave adds a contemporary touch to your kitchen deco', '0', 1, 'en', 12, 16, 3),
(69, 'وحدة حائط Elba 220-00BK فرن ميكروويف مدمج سعة 22 لترًا', 'يوفر فرن الميكروويف المدمج Elba 220-00BK أقصى قدر من العملية في تصميم مدمج، حيث يتميز بسعة 22 لترًا تندمج بسلاسة في مطبخك. مع لمسة نهائية سوداء أنيقة، يضيف هذا الميكروويف لمسة معاصرة إلى ديكور مطبخك. إنه مزود بتحكم رقمي ووظيفة شواء و5 مستويات طاقة للميكرو', '0', 1, 'ar', 12, 46, 3),
(70, 'Algor AL250-GSS Built-In Microwave 25L', 'Algor delivers professional-grade cooking appliances with the AL250-GSS Built-In Microwave. Featuring a stainless steel design and advanced functionalities, it integrates style and efficiency for outstanding cooking performance.\r\n\r\nFeatures:\r\n • 8 Multifu', '0', 1, 'en', 12, 16, 3),
(71, 'Algor AL250-GSS ميكرويف مدمج سعة 25 لتر', 'تقدم شركة Algor أجهزة طهي احترافية مع الميكروويف المدمج AL250-GSS. يتميز بتصميم من الفولاذ المقاوم للصدأ ووظائف متقدمة، ويجمع بين الأناقة والكفاءة للحصول على أداء طهي رائع.\r\n\r\nالمميزات:\r\n• 8 وظائف متعددة\r\n• سعة 25 لترًا\r\n• 5 مستويات طاقة للميكروويف\r\n• وظي', '0', 1, 'ar', 12, 46, 3),
(72, 'Liebherr SRbdd 5220 Refrigerator', 'Advanced Refrigerator with EasyFresh Plus\r\n  overview: The SRbdd 5220 is a cutting-edge refrigerator designed with EasyFresh Plus technology, ensuring your food remains fresh while blending seamlessly into your kitchen decor. With its stylish BlackSteel f', '0', 1, 'en', 12, 14, 3),
(73, 'ثلاجة ليبهر IRB 5120 مدمجة', 'يجمع IRB 5120 بين تقنية BioFresh المتقدمة والتصميم الأنيق، مما يضمن بقاء طعامك طازجًا لفترة أطول. تصميمها الفعّال وميزاتها المتميزة تجعلها إضافة مثالية لأي مطبخ عصري.\"\r\n\r\nالطاقة والاستهلاك:\r\n• خرج الضوضاء: 33 ديسيبل (أ)\r\n• استهلاك الطاقة في 365 يومًا / 24', '0', 1, 'ar', 12, 44, 3),
(74, 'ثلاجة ليبهر SRbdd 5220', 'ثلاجة متطورة مع تقنية EasyFresh Plus\r\nنظرة عامة: تعد SRbdd 5220 ثلاجة متطورة مصممة بتقنية EasyFresh Plus، مما يضمن بقاء طعامك طازجًا مع امتزاجه بسلاسة مع ديكور مطبخك. بفضل لمستها الأنيقة من BlackSteel وميزاتها الفعّالة، توفر هذه الثلاجة الشكل والوظيفة.\r\n\r', '0', 1, 'ar', 12, 44, 3),
(75, 'Liebherr UIK 1514 Built-Under Fridge', 'Management and Functions:\r\n• Control unit: Buttons\r\n• Number of temperature zones: 2\r\n• Number of regulated refrigeration circuits: 1\r\n• Temperature display: Refrigerator\r\n\r\nPower and Consumption:\r\n• Energy efficiency class: E\r\n• Energy consumption per ye', '0', 1, 'en', 12, 14, 3),
(76, 'Liebherr UIK 1514 ثلاجة مدمجة', 'الإدارة والوظائف:\r\n• وحدة التحكم: أزرار\r\n• عدد مناطق درجة الحرارة: 2\r\n• عدد دوائر التبريد المنظمة: 1\r\n• عرض درجة الحرارة: ثلاجة\r\n\r\nالطاقة والاستهلاك:\r\n• فئة كفاءة الطاقة: E\r\n• استهلاك الطاقة سنويًا: 145 كيلو وات ساعة/ساعة\r\n• فئة المناخ: SN، N، ST\r\n• مستوى', '0', 1, 'ar', 12, 44, 3),
(77, 'Liebherr SIFN 5128 Built-In Freezer', 'features: Plus, NoFrost\r\ndescription: \"The SIFN 5128 combines sleek design with advanced NoFrost technology for efficient food preservation. With 8 spacious drawers and a quiet operation, it\"s the ideal choice for modern kitchens.\"\r\n\r\npower_and_consumptio', '0', 1, 'en', 12, 27, 3),
(78, 'فريزر مدمج من طراز SIFN 5128 من شركة Liebherr', 'المميزات: بالإضافة إلى ذلك، خاصية NoFrost\r\nالوصف: \"تجمع ثلاجة SIFN 5128 بين التصميم الأنيق وتقنية NoFrost المتقدمة لحفظ الطعام بكفاءة. مع 8 أدراج واسعة وتشغيل هادئ، فهي الخيار المثالي للمطابخ الحديثة.\"\r\n\r\nالطاقة والاستهلاك:\r\n• خرج الضوضاء: 33 ديسيبل (أ)\r\n', '0', 1, 'ar', 12, 48, 3),
(79, 'Liebherr EGN 9471 Freezer', 'Liebherr\'s EGN 9471 Freezer for integrated use with NoFrost technology brings authentic German Engineering to your kitchen:\r\n • Premium quality\r\n • Cutting-edge design\r\n • Innovative features including high-quality materials, perfectly detailed finishes, ', '0', 1, 'en', 12, 27, 3),
(80, 'ثلاجة ليبهير EGN 9471', 'ثلاجة ليبهير EGN 9471 للاستخدام المتكامل مع تقنية NoFrost تجلب الهندسة الألمانية الأصيلة إلى مطبخك:\r\n• جودة ممتازة\r\n• تصميم متطور\r\n• ميزات مبتكرة بما في ذلك مواد عالية الجودة وتشطيبات مفصلة تمامًا ومكونات تبريد مميزة\r\n\r\nالميزات:\r\n• SuperQuiet: يتم تقليل م', '0', 1, 'ar', 12, 48, 3),
(81, 'Liebherr EGN 9671 Freezer', ' Liebherr\'s EGN 9671 Freezer for integrated use with NoFrost technology brings authentic German Engineering to your kitchen:\r\n • Premium quality\r\n • Cutting-edge design\r\n • Innovative features including high-quality materials, perfectly detailed finishes,', '0', 1, 'en', 12, 27, 3),
(82, 'فريزر ليبهير EGN 9671', 'ثلاجة ليبهير EGN 9671 للاستخدام المتكامل مع تقنية NoFrost تجلب الهندسة الألمانية الأصيلة إلى مطبخك:\r\n• جودة ممتازة\r\n• تصميم متطور\r\n• ميزات مبتكرة بما في ذلك مواد عالية الجودة وتشطيبات مفصلة تمامًا ومكونات تبريد مميزة\r\n\r\nالميزات:\r\n• SuperQuiet: يتم تقليل م', '0', 1, 'ar', 12, 48, 3),
(83, 'Liebherr SFNbsd 529i Peak Freezer', 'Liebherr SFNbsd 529i Peak Freezer features NoFrost technology to eliminate manual defrosting and save energy. It combines modern design with advanced technology, including a touch display, BlackSteel finish, and an IceTower for convenient ice storage.\r\n\r\n', '0', 1, 'en', 12, 27, 3),
(84, 'فريزر Liebherr SFNbsd 529i Peak', 'تتميز ثلاجة الفريزر Liebherr SFNbsd 529i Peak بتقنية NoFrost للتخلص من إزالة الجليد يدويًا وتوفير الطاقة. فهي تجمع بين التصميم العصري والتكنولوجيا المتقدمة، بما في ذلك شاشة تعمل باللمس، وطبقة نهائية من الفولاذ الأسود، وبرج ثلج لتخزين الثلج بشكل مريح.\r\n\r\nا', '0', 1, 'ar', 12, 48, 3),
(85, 'Liebherr OKes 1750 Outdoor Cooler', 'Liebherr OKes 1750 Outdoor Cooler is designed for outdoor use with rust- and weatherproof materials, robust construction, and high-quality components. It features an integrated lock for security, a flexible interior layout, and adjustable cooling temperat', '0', 1, 'en', 12, 14, 3),
(86, 'Liebherr OKes 1750 Outdoor Cooler', 'تم تصميم مبرد الهواء الطلق Liebherr OKes 1750 للاستخدام في الهواء الطلق باستخدام مواد مقاومة للصدأ والطقس، وبنية قوية ومكونات عالية الجودة. يتميز بقفل مدمج للأمان، وتصميم داخلي مرن، ودرجة حرارة تبريد قابلة للتعديل بين +2 درجة مئوية و+14 درجة مئوية.\r\n\r\nالم', '0', 1, 'ar', 12, 44, 3),
(87, 'ألفا فورني موديرنو 3 فرن بيتزا غاز أرديسيا رمادي', 'الفرن الحيوي الذي كنت تبحث عنه لطهي البيتزا النابولية الحقيقية. في لون أرديزيا الرمادي، يسخن فرن الغاز الجديد المكون من 3 بيتزا من ألفا فورني، موديرنو 3 بيتزا، بسرعة كبيرة مما يسمح لك بطهي أول بيتزا في 30 دقيقة فقط. يمنحك فرن 3 بيتزا تجربة طهي مثالية ومتج', '0', 1, 'ar', 12, 42, 3),
(88, 'ألفا فورني موديرنو 5 فرن بيتزا غاز', 'تم تصميم فرن 5 Pizze لتلبية جميع احتياجاتك: أداء احترافي وسعة قصوى. فرن بتصميم رائع وأداء شبه احترافي. يضمن اختيار المواد والجودة العالية للمكونات الداخلية أن فرن 5 Pizze يحافظ على وظائفه ومتانته دون أي تنازلات. في 30 دقيقة فقط، يمكن للفرن أن يصل إلى 500 ', '0', 1, 'ar', 12, 42, 3),
(89, 'Alfa Forni Moderno 3 Gas Pizza Oven', 'The lively oven you’ve been looking for to cook real Neapolitan pizza. In a stunning Antique Red color, the new 3-pizza gas oven from Alfa Forni, Moderno 3 Pizze, heats up very quickly allowing you to cook your first pizza in just 30 minutes. The 3 Pizze ', '0', 1, 'en', 12, 12, 3),
(90, 'ألفا فورني موديرنو 3 فرن بيتزا غاز', 'ألفا فورني موديرنو\r\n3 فرن بيتزا غاز أرديسيا رمادي', '0', 1, 'ar', 12, 42, 3),
(91, 'Alfa Forni Moderno 2 Gas Pizza Oven', 'A high-design and high-performance outdoor pizza oven that will enhance your outdoor cooking experience. Functional design and attention to detail combined with the best of Alfa technology make the 2 Pizze oven an exceptionally high-performance cooking to', '0', 1, 'en', 12, 12, 3),
(92, 'ألفا فورني موديرنو 2 فرن بيتزا غاز', 'فرن بيتزا خارجي بتصميم عالي الأداء يعزز تجربة الطهي في الهواء الطلق. التصميم العملي والاهتمام بالتفاصيل جنبًا إلى جنب مع أفضل تكنولوجيا ألفا يجعلان من فرن 2 Pizze أداة طهي عالية الأداء بشكل استثنائي تمتزج بشكل مثالي في المساحات الخارجية الحديثة. حجمه الصغ', '0', 1, 'ar', 12, 42, 3),
(93, 'Elba IDW129 Built-In Dishwasher 60 cm', 'Built-in dishwasher offering 15 place settings and a 3-layer basket system. Features 9 programs, including an auto program, and 3 washing temperatures. Includes a cutlery rack and special cycles: intensive, delicate, rapid, bio, strong, half load for top,', '0', 1, 'en', 12, 10, 3),
(94, 'إلبا IDW129 غسالة أطباق مدمجة 60 سم', 'غسالة أطباق مدمجة توفر 15 إعدادًا للمكان ونظام سلة مكون من 3 طبقات. تتميز بـ 9 برامج، بما في ذلك برنامج تلقائي، و3 درجات حرارة للغسيل. تتضمن رف أدوات مائدة ودورات خاصة: مكثفة، ودقيقة، وسريعة، وحيوية، وقوية، ونصف حمولة للأعلى والأسفل وكلا السلتين.\r\nتتميز ب', '0', 1, 'ar', 12, 40, 3),
(95, 'Elba FDW154SS Freestanding Dishwasher 60 cm', 'Freestanding dishwasher with a stainless steel door. It offers 14 place settings, a 3-layer basket system, and 6 programs including intensive, normal, and Eco. It includes the possibility of half load and an extra drying function. For added safety, it fea', '0', 1, 'en', 12, 10, 3),
(96, 'إلبا FDW154SS غسالة أطباق مستقلة 60 سم', 'غسالة أطباق قائمة بذاتها بباب من الفولاذ المقاوم للصدأ. توفر 14 إعدادًا للأطباق، ونظام سلة من 3 طبقات، و6 برامج بما في ذلك المكثف والعادي والاقتصادي. تتضمن إمكانية نصف الحمل ووظيفة تجفيف إضافية. لمزيد من الأمان، تتميز بقفل للأطفال.\r\n\r\nالمميزات:\r\n• 14 مكان', '0', 1, 'ar', 12, 40, 3),
(97, 'Elba IDW120 Built-In Dishwasher 60 cm', 'Built-in dishwasher offering 12 place settings and a 2-layer basket system. Features 6 programs, including an auto program, and 3 washing temperatures. Includes special cycles: intensive, delicate, rapid, bio, strong, and half load for top or bottom baske', '0', 1, 'en', 12, 10, 3),
(98, 'إلبا IDW120 غسالة أطباق مدمجة 60 سم', 'غسالة أطباق مدمجة توفر 12 إعدادًا للمكان ونظام سلة من طبقتين. تتميز بـ 6 برامج، بما في ذلك برنامج تلقائي، و3 درجات حرارة للغسيل. تتضمن دورات خاصة: مكثفة، ودقيقة، وسريعة، وبيولوجية، وقوية، ونصف حمولة للسلال العلوية أو السفلية.\r\nتتميز بالتشغيل بالتحكم الإلك', '0', 1, 'ar', 12, 40, 3),
(99, 'Algor AGDW12BI Built-In Dishwasher 60 cm', 'The Algor AGDW12BI is a built-in dishwasher designed for 12 place settings. It features a stainless steel tub and filter, and offers various programs and special cycles for flexible and efficient dishwashing.\r\n\r\nFeatures:\r\n • Energy Efficiency Class: A+\r\n', '0', 1, 'en', 12, 10, 3),
(100, 'ألجور AGDW12BI غسالة أطباق مدمجة 60 سم', 'غسالة الأطباق المدمجة Algor AGDW12BI مصممة لـ 12 مكانًا. تتميز بحوض وفلتر من الفولاذ المقاوم للصدأ، وتوفر برامج مختلفة ودورات خاصة لغسل الأطباق بمرونة وكفاءة.\r\n\r\nالمزايا:\r\n• فئة كفاءة الطاقة: A+\r\n• غسالة أطباق مدمجة بالكامل\r\n• 12 مكانًا\r\n• سلة مكونة من طب', '0', 1, 'ar', 12, 40, 3),
(101, 'Flowers', 'Flowers\r\n\r\nWIDTH: 140 cm\r\n\r\nWEIGHT: 672 GSM\r\n\r\nCOMPOSITION: 100% POLYESTER\r\n', '0', 1, 'en', 12, 29, 25),
(102, 'زهور', 'زهور\r\n\r\nالعرض: 140 سم\r\n\r\nالوزن: 672 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر', '0', 1, 'ar', 12, 49, 25),
(103, 'Rainbow', 'Rainbow\r\n\r\nWIDTH: 140 cm\r\n\r\nWEIGHT: 680 GSM\r\n\r\nCOMPOSITION: 100% POLYESTER\r\n', '0', 1, 'en', 12, 29, 25),
(104, 'قوس قزح', 'قوس قزح\r\n\r\nالعرض: 140 سم\r\n\r\nالوزن: 680 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر\r\nالعرض: 140 سم\r\n\r\nالوزن: 680 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر', '0', 1, 'ar', 12, 49, 25),
(105, 'Rainforest', 'Rainforest\r\n\r\nWIDTH: 140 cm\r\n\r\nWEIGHT: 672 GSM\r\n\r\nCOMPOSITION: 100% POLYESTER\r\n', '0', 1, 'en', 12, 29, 25),
(106, 'الغابات المطيرة', 'الغابات المطيرة\r\n\r\nالعرض: 140 سم\r\n\r\nالوزن: 672 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر', '0', 1, 'ar', 12, 49, 25),
(107, 'Bella', 'Bella\r\n\r\nWIDTH: 1.40 CM\r\n\r\nWEIGHT: 416 GSM\r\n\r\nCOMPOSITION: 100% POLYESTER\r\n', '0', 1, 'en', 12, 29, 25),
(108, 'بيلا', 'بيلا\r\n\r\nالعرض: 1.40 سم\r\n\r\nالوزن: 416 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر', '0', 1, 'ar', 12, 49, 25),
(109, 'Daisy’s Flowers', 'Daisy’s Flowers\r\n\r\nWIDTH: 1.40 CM\r\n\r\nWEIGHT: 446 GSM\r\n\r\nCOMPOSITION: 100% POLYESTER\r\n', '0', 1, 'en', 12, 29, 25),
(110, 'زهور ديزي', 'زهور ديزي\r\n\r\nالعرض: 1.40 سم\r\n\r\nالوزن: 446 جرام في المتر المربع\r\n\r\nالتركيب: 100% بوليستر', '0', 1, 'ar', 12, 49, 25),
(111, 'LEAD STONE', 'Cold Neutrals is used to describe any color that is calm or soothing in nature. Cool colors are not overpowering and tend to recede in space. For this reason, cool colors typically make a space seem larger, more spacious and relaxing', '0', 1, 'en', 12, 30, 26),
(112, 'LEAD STONE', 'يستخدم اللون المحايد البارد لوصف أي لون هادئ أو مهدئ بطبيعته. الألوان الباردة لا تغلب وتميل إلى التراجع في الفضاء. لهذا السبب، الألوان الباردة عادةً ما تجعل المساحة تبدو أكبر وأكثر اتساعًا واسترخاءً', '0', 1, 'ar', 12, 50, 26),
(113, 'DESERT TAN', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(114, 'الصحراء لذا', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(115, 'Y32010', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(116, 'Y32010', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(117, 'Y20510', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(118, 'Y20510', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(119, 'Y11015', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(120, 'Y11015', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(121, 'Y21020', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(122, 'Y21020', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(123, 'BIGHT SUNLIGHT', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(124, 'ضوء الشمس الساطع', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(125, 'SATURN DUST', 'Yellow can be warmth, cheerfulness, increased mental activity, increased muscle energy. The color yellow helps activate the memory, encourage communication, enhance vision, build confidence, and stimulate the nervous system.', '0', 1, 'en', 12, 30, 26),
(126, 'غبار زحل', 'يمكن أن يكون اللون الأصفر هو الدفء والبهجة وزيادة النشاط العقلي وزيادة طاقة العضلات. يساعد اللون الأصفر على تنشيط الذاكرة، وتشجيع التواصل، وتعزيز الرؤية، وبناء الثقة، وتنشيط الجهاز العصبي.', '0', 1, 'ar', 12, 50, 26),
(127, 'ROSE WILT', 'Warm neutrals are relaxing and calming colors. They have some of the same pureness and softness of the color white, but with a warmer undertone. Warm Neutrals represent quiet and pleasantness.They set a relaxed tone for understated elegance.', '0', 1, 'en', 12, 30, 26),
(128, 'ذبول الورد', 'الألوان المحايدة الدافئة هي ألوان مريحة ومهدئة. لديهم نفس نقاء ونعومة اللون الأبيض، ولكن مع مسحة أكثر دفئًا. تمثل الألوان المحايدة الدافئة الهدوء والبهجة. فهي تحدد نغمة مريحة للأناقة البسيطة.', '0', 1, 'ar', 12, 50, 26),
(129, 'Y24005', 'Warm neutrals are relaxing and calming colors. They have some of the same pureness and softness of the color white, but with a warmer undertone. Warm Neutrals represent quiet and pleasantness.They set a relaxed tone for understated elegance.', '0', 1, 'en', 12, 30, 26),
(130, 'Y24005', 'الألوان المحايدة الدافئة هي ألوان مريحة ومهدئة. لديهم نفس نقاء ونعومة اللون الأبيض، ولكن مع مسحة أكثر دفئًا. تمثل الألوان المحايدة الدافئة الهدوء والبهجة. فهي تحدد نغمة مريحة للأناقة البسيطة.', '0', 1, 'ar', 12, 50, 26),
(131, 'POWDER CELESTE', 'For designers, blue is the most versatile of all colour groups . Historically the precious nature of blue pigments has elevated the stature of paintings and of interior decoration.', '0', 1, 'en', 12, 30, 26),
(132, 'مسحوق سيليست', 'بالنسبة للمصممين، يعتبر اللون الأزرق الأكثر تنوعًا بين جميع مجموعات الألوان. تاريخيًا، أدت الطبيعة الثمينة للأصباغ الزرقاء إلى رفع مكانة اللوحات والديكور الداخلي.', '0', 1, 'ar', 12, 50, 26),
(133, 'MOONSTONE BLUE', 'For designers, blue is the most versatile of all colour groups . Historically the precious nature of blue pigments has elevated the stature of paintings and of interior decoration.', '0', 1, 'en', 12, 30, 26),
(134, 'حجر القمر الأزرق', 'بالنسبة للمصممين، يعتبر اللون الأزرق الأكثر تنوعًا بين جميع مجموعات الألوان. تاريخيًا، أدت الطبيعة الثمينة للأصباغ الزرقاء إلى رفع مكانة اللوحات والديكور الداخلي.', '0', 1, 'ar', 12, 50, 26),
(135, 'CRISP THISTLE', 'Red is assertive, daring, determined, energetic, powerful, enthusiastic, impulsive, exciting, and aggressive. Red represents physical energy, passion, and desire. It symbolizes action, confidence, and courage.', '0', 1, 'en', 12, 30, 26),
(136, 'شوك هش', 'اللون الأحمر حازم، وجريء، وحازم، وحيوي، وقوي، ومتحمس، ومندفع، ومثير، وعدواني. يمثل اللون الأحمر الطاقة الجسدية والعاطفة والرغبة. إنه يرمز إلى العمل والثقة والشجاعة.', '0', 1, 'ar', 12, 50, 26),
(137, 'GUEST ROOMS', 'GUEST ROOMS', '0', 1, 'en', 12, 3, 5),
(138, 'غرف الطعام', 'غرف الطعام', '0', 1, 'ar', 12, 31, 5),
(139, 'DINING ROOM', 'DINING ROOM', '0', 1, 'en', 12, 1, 5),
(140, 'BEDROOMS', 'BEDROOMS', '0', 1, 'en', 12, 2, 5),
(141, 'غرف نوم', 'غرف نوم', '0', 1, 'ar', 12, 32, 5),
(142, 'LIVING ROOM', 'LIVING ROOM', '0', 1, 'en', 12, 4, 5),
(143, 'غرفة الجلوس', 'غرفة الجلوس', '0', 1, 'ar', 12, 34, 5),
(144, 'DECORATIVE', 'DECORATIVE', '0', 1, 'en', 12, 6, 5),
(145, 'ديكور', 'ديكور', '0', 1, 'ar', 12, 36, 5),
(146, 'CUPBOARD', 'CUPBOARD', '0', 1, 'en', 12, 7, 5),
(147, 'خزانة', 'خزانة', '0', 1, 'ar', 12, 37, 5),
(148, 'OPEN SHELVES', 'OPEN SHELVES', '0', 1, 'en', 12, 8, 5),
(149, 'رفوف مفتوحة', 'رفوف مفتوحة', '0', 1, 'ar', 12, 38, 5),
(150, 'ELBA COFFEE MACHINES', 'ELBA COFFEE MACHINES', '0', 1, 'en', 12, 15, 3),
(151, 'آلات القهوة إلبا', 'آلات القهوة إلبا', '0', 1, 'ar', 12, 45, 3),
(152, 'WALL MOUNTED', 'WALL MOUNTED', '0', 1, 'en', 12, 11, 4),
(153, 'مثبت على الحائط', 'مثبت على الحائط', '0', 1, 'ar', 12, 41, 4),
(154, 'ELBA WASHING MACHINE', 'ELBA WASHING MACHINE', '0', 1, 'en', 12, 13, 3),
(155, 'غسالة البا', 'غسالة البا', '0', 1, 'ar', 12, 43, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `image_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`image_id`, `image`, `product_id`) VALUES
(35, '1733865230554-cucina_laguna.jpg', 27),
(36, '1733865230561-cucina_laguna_003.jpg', 27),
(37, '1733865230567-cucina_laguna_004.jpg', 27),
(38, '1733865230579-cucina_laguna_005.jpg', 27),
(43, '1733866377611-cucina_essentia.jpg', 29),
(44, '1733866377614-cucina_essentia_01.jpg', 29),
(45, '1733866377619-cucina_essentia_composizione.jpg', 29),
(46, '1733866377620-cucina_essentia_dettaglio.jpg', 29),
(47, '1733866534009-cucina_essentia.jpg', 30),
(48, '1733866534013-cucina_essentia_01.jpg', 30),
(49, '1733866534017-cucina_essentia_composizione.jpg', 30),
(50, '1733866534018-cucina_essentia_dettaglio.jpg', 30),
(65, '1733867937135-cucina_ludos.jpg', 28),
(66, '1733867937138-cucina_ludos_002.jpg', 28),
(67, '1733867937143-cucina_ludos_dettaglio.jpg', 28),
(68, '1733867937144-cucina_ludos_composizione.jpg', 28),
(69, '1733868354282-cucina_nice.jpg', 31),
(70, '1733868354287-cucina_nice_01.jpg', 31),
(71, '1733868354290-cucina_nice_dettaglio.jpg', 31),
(72, '1733868354300-cucina_nice_composizione.jpg', 31),
(73, '1733868426118-cucina_nice.jpg', 32),
(74, '1733868426122-cucina_nice_01.jpg', 32),
(75, '1733868426126-cucina_nice_dettaglio.jpg', 32),
(76, '1733868426137-cucina_nice_composizione.jpg', 32),
(77, '1733869085148-victory.jpg', 33),
(78, '1733869085150-victory_02.jpg', 33),
(79, '1733869085153-victory_06.jpg', 33),
(80, '1733869085156-victory_dettaglio_01.jpg', 33),
(81, '1733869085160-cucina_victory_composizione_02.jpg', 33),
(82, '1733869085160-cucina_victory_composizione_01.jpg', 33),
(83, '1733869318400-victory.jpg', 34),
(84, '1733869318404-victory_02.jpg', 34),
(85, '1733869318406-victory_06.jpg', 34),
(86, '1733869318409-victory_dettaglio_01.jpg', 34),
(87, '1733869318416-cucina_victory_composizione_02.jpg', 34),
(88, '1733869318417-cucina_victory_composizione_01.jpg', 34),
(89, '1733869667075-cucina_steel.jpg', 35),
(90, '1733869667080-cucina_steel_02.jpg', 35),
(91, '1733869667085-cucina_steel_03.jpg', 35),
(92, '1733869667087-cucina_steel_dettaglio_001.jpg', 35),
(93, '1733869667090-cucina_steel_composizione_01.jpg', 35),
(94, '1733869667091-cucina_steel_composizione_02.jpg', 35),
(95, '1733869757306-cucina_steel.jpg', 36),
(96, '1733869757311-cucina_steel_02.jpg', 36),
(97, '1733869757316-cucina_steel_03.jpg', 36),
(98, '1733869757319-cucina_steel_dettaglio_001.jpg', 36),
(99, '1733869757322-cucina_steel_composizione_01.jpg', 36),
(100, '1733869757323-cucina_steel_composizione_02.jpg', 36),
(165, '1733939830135-it21415-7135081-foster-built-in-oven-60cm-1_1.jpg', 53),
(167, '1733945307999-it21415-7135081-foster-built-in-oven-60cm-1_1.jpg', 54),
(168, '1733950461533-it0021786-elba-elio-g92-ick-built-in-gas-oven-90cm-1.jpg', 55),
(169, '1733950514861-it0021786-elba-elio-g92-ick-built-in-gas-oven-90cm-1.jpg', 56),
(170, '1733950676619-it21415-7135081-foster-built-in-oven-60cm-1_1.jpg', 57),
(171, '1733950837898-it0022163-elba-10950-xn--built-in-gas-oven-90cm-1_1_1.jpg', 58),
(172, '1733950925705-it0022163-elba-10950-xn--built-in-gas-oven-90cm-1_1_1.jpg', 59),
(173, '1733952078132-it0022410-foster-7300000-induction-hob-1.jpg.jpg', 60),
(174, '1733952136561-it0022410-foster-7300000-induction-hob-1.jpg.jpg', 61),
(175, '1734013586381-it0022453-elica-nikolatesla-unplugged-exractor-hob-duct-out-stainless-steel-1.jpg', 62),
(176, '1734013655377-it0022453-elica-nikolatesla-unplugged-exractor-hob-duct-out-stainless-steel-1.jpg', 63),
(177, '1734013948847-it0022442-foster-7365040-modular-quadra-configuration-induction-hob-1_1.jpg', 64),
(178, '1734014027330-it0022442-foster-7365040-modular-quadra-configuration-induction-hob-1_1.jpg', 65),
(179, '1734014207367-it0022137-algor-ag506mwbks-built-in-microwave-60cm-1.jpg', 66),
(180, '1734014269469-it0022137-algor-ag506mwbks-built-in-microwave-60cm-1.jpg', 67),
(181, '1734014443833-it21026-elba-22000bk-wall-unit-built-in-microwave-oven-1.jpg', 68),
(182, '1734014506337-it21026-elba-22000bk-wall-unit-built-in-microwave-oven-1.jpg', 69),
(183, '1734015342054-it0022136-algor-al250gss-built-in-microwave-60cm-1.jpg', 70),
(184, '1734015384791-it0022136-algor-al250gss-built-in-microwave-60cm-1.jpg', 71),
(186, '1734017508532-it0022551-liebherr-irb-5120-built-in-fridge-1_1.jpg', 73),
(187, '1734017717539-it0022504-liebherr-srbdd-5220-refrigerator-1.jpg', 72),
(188, '1734017804833-it0022504-liebherr-srbdd-5220-refrigerator-1.jpg', 74),
(189, '1734018208248-it21300-liebherr-uik-1514-built-under-fridge-1_1.jpg', 75),
(190, '1734018285694-it21300-liebherr-uik-1514-built-under-fridge-1_1.jpg', 76),
(191, '1734018717398-it0022552-liebherr-sifn-5128-built-in-freezer-1.jpg', 77),
(192, '1734181384305-it0022552-liebherr-sifn-5128-built-in-freezer-1.jpg', 78),
(193, '1734181545552-it21284-liebherr-egn-9471-freezer-nofrost-3.jpg', 79),
(194, '1734181610601-it21284-liebherr-egn-9471-freezer-nofrost-3.jpg', 80),
(195, '1734182059204-it21283-liebherr-egn-9671-freezer-nofrost-1.jpg', 81),
(196, '1734182117054-it21283-liebherr-egn-9671-freezer-nofrost-1.jpg', 82),
(197, '1734182291412-it0022017-freezer-liebherr-sfnbsd-529i-peak-no-frost-ice-maker-6.jpg', 83),
(198, '1734182291412-it0022017-freezer-liebherr-sfnbsd-529i-peak-no-frost-ice-maker-5.jpg', 83),
(199, '1734182402307-it0022017-freezer-liebherr-sfnbsd-529i-peak-no-frost-ice-maker-6.jpg', 84),
(200, '1734182402307-it0022017-freezer-liebherr-sfnbsd-529i-peak-no-frost-ice-maker-5.jpg', 84),
(201, '1734182846069-it0022438-freestanding-outdoor-cooler-liebherr-okes-1750-2.jpg', 85),
(202, '1734182914395-it0022438-freestanding-outdoor-cooler-liebherr-okes-1750-2.jpg', 86),
(204, '1734184125527-it0022472-alfa-forni-moderno-5-pizze-gas-outdoor-oven-ardesia-grey-1_1.jpg', 88),
(205, '1734184125527-it0022472-alfa-forni-moderno-5-pizze-gas-outdoor-oven-ardesia-grey-2.jpg', 88),
(208, '1734184368839-it0022476-alfa-forni-moderno-3-gas-pizza-oven-ardesia-grey-2.jpg', 87),
(209, '1734184696476-it0022477-alfa-forni-moderno-3-pizze-gas-oven-antique-red-1_1.jpg', 89),
(210, '1734184779121-it0022477-alfa-forni-moderno-3-pizze-gas-oven-antique-red-1_1.jpg', 90),
(211, '1734185053897-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-2_1(1).jpg', 91),
(212, '1734185053897-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-3_1.jpg', 91),
(213, '1734185053898-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-1_1.jpg', 91),
(214, '1734185166502-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-2_1(1).jpg', 92),
(215, '1734185166502-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-3_1.jpg', 92),
(216, '1734185166502-it0022481-gas-pizza-oven-alfa-forni-moderno-2-pizza-ardesia-grey-1_1.jpg', 92),
(217, '1734185464936-it21072-elba-idw129-built-in-dishwasher-1_1.jpg', 93),
(218, '1734185464936-it21072-elba-idw129-built-in-dishwasher-2.jpg', 93),
(219, '1734185464937-it21072-elba-idw129-built-in-dishwasher-3.jpg', 93),
(220, '1734185464937-it21072-elba-idw129-built-in-dishwasher-4.jpg', 93),
(221, '1734185562967-it21072-elba-idw129-built-in-dishwasher-1_1.jpg', 94),
(222, '1734185562967-it21072-elba-idw129-built-in-dishwasher-2.jpg', 94),
(223, '1734185562968-it21072-elba-idw129-built-in-dishwasher-3.jpg', 94),
(224, '1734185562968-it21072-elba-idw129-built-in-dishwasher-4.jpg', 94),
(225, '1734185759164-it21074-elba-fdw154ss-freestanding-dishwasher-2.jpg', 95),
(226, '1734185759164-it21074-elba-fdw154ss-freestanding-dishwasher-3.jpg', 95),
(227, '1734185759165-it21074-elba-fdw154ss-freestanding-dishwasher-4.jpg', 95),
(228, '1734185846587-it21074-elba-fdw154ss-freestanding-dishwasher-2.jpg', 96),
(229, '1734185846587-it21074-elba-fdw154ss-freestanding-dishwasher-3.jpg', 96),
(230, '1734185846588-it21074-elba-fdw154ss-freestanding-dishwasher-4.jpg', 96),
(231, '1734186022176-it21073-elba-idw120-built-in-dishwasher-1_1.jpg', 97),
(232, '1734186022176-it21073-elba-idw120-built-in-dishwasher-2.jpg', 97),
(233, '1734186022176-it21073-elba-idw120-built-in-dishwasher-3.jpg', 97),
(234, '1734186110300-it21073-elba-idw120-built-in-dishwasher-1_1.jpg', 98),
(235, '1734186110300-it21073-elba-idw120-built-in-dishwasher-2.jpg', 98),
(236, '1734186110301-it21073-elba-idw120-built-in-dishwasher-3.jpg', 98),
(237, '1734186341255-it0022291-algor-agdw12bi-built-in-dishwasher-60cm-1.jpg', 99),
(238, '1734186407242-it0022291-algor-agdw12bi-built-in-dishwasher-60cm-1.jpg', 100),
(239, '1734187441154-castanea.jpg', 37),
(240, '1734187441156-castanea_01.jpg', 37),
(241, '1734187441157-castanea_dettaglio_01.jpg', 37),
(242, '1734187511632-castanea.jpg', 38),
(243, '1734187511634-castanea_01.jpg', 38),
(244, '1734187511636-castanea_dettaglio_01.jpg', 38),
(245, '1734187511638-castanea_dettaglio_02.jpg', 38),
(246, '1734187729229-$R38G0IG.jpg', 52),
(247, '1734187729231-$R2FLBV2.jpg', 52),
(248, '1734187729232-$REXBOD2.jpg', 52),
(249, '1734187788063-$RVTYAA0.jpg', 39),
(250, '1734187788068-$RMFJE91.jpg', 39),
(251, '1734187788071-$R4NXPJH.jpg', 39),
(252, '1734187819354-$RVTYAA0.jpg', 40),
(253, '1734187819357-$RMFJE91.jpg', 40),
(254, '1734187819360-$R4NXPJH.jpg', 40),
(255, '1734187866902-$RSBRHOL.jpg', 41),
(256, '1734187866904-$R6BZXXW.jpg', 41),
(257, '1734187890091-$RSBRHOL.jpg', 42),
(258, '1734187890093-$R6BZXXW.jpg', 42),
(259, '1734187984979-$RNE66OC.jpg', 43),
(260, '1734187984985-$RBH5N9E.jpg', 43),
(261, '1734187984985-$R5B1KDJ.jpg', 43),
(262, '1734187984985-$RNE66OC.jpg', 43),
(263, '1734187984997-$RKMFQ0V.jpg', 43),
(264, '1734188022059-$RNE66OC.jpg', 44),
(265, '1734188022065-$RKMFQ0V.jpg', 44),
(266, '1734188022066-$R5B1KDJ.jpg', 44),
(267, '1734188022067-$RBH5N9E.jpg', 44),
(268, '1734188080827-$RJ56APJ.jpg', 45),
(269, '1734188080830-$RNYYN4X.jpg', 45),
(270, '1734188080834-$R38712I.jpg', 45),
(271, '1734188080834-$RFPQGH7.jpg', 45),
(272, '1734188113527-$RJ56APJ.jpg', 46),
(273, '1734188113532-$RNYYN4X.jpg', 46),
(274, '1734188113536-$R38712I.jpg', 46),
(275, '1734188113537-$RFPQGH7.jpg', 46),
(276, '1734188180494-$R4S0HZL.jpg', 47),
(277, '1734188180499-$RJUMJME.jpg', 47),
(278, '1734188180501-$RYHMVMM.jpg', 47),
(279, '1734188206289-$R4S0HZL.jpg', 48),
(280, '1734188206290-$RJUMJME.jpg', 48),
(281, '1734188206295-$RYHMVMM.jpg', 48),
(282, '1734188339484-$R9IF4FL.jpg', 49),
(283, '1734188339484-$RAZYPAU.jpg', 49),
(284, '1734188339484-$R9BEWT5.jpg', 49),
(285, '1734188339486-$RQP7BMK.jpg', 49),
(286, '1734188379809-$R9IF4FL.jpg', 50),
(287, '1734188379810-$RAZYPAU.jpg', 50),
(288, '1734188379810-$R9BEWT5.jpg', 50),
(289, '1734188379811-$RQP7BMK.jpg', 50),
(290, '1734188442619-$R38G0IG.jpg', 51),
(291, '1734188442622-$R2FLBV2.jpg', 51),
(292, '1734188442623-$REXBOD2.jpg', 51),
(293, '1736873632906-3.jpg', 101),
(294, '1736873678746-3.jpg', 102),
(295, '1736873749861-1.jpg', 103),
(296, '1736873809129-1.jpg', 104),
(297, '1736873897886-2.jpg', 105),
(298, '1736873937268-2.jpg', 106),
(299, '1736874494575-4-1.jpg', 107),
(300, '1736874562134-4-1.jpg', 108),
(301, '1736874673437-7-1.jpg', 109),
(302, '1736874712709-7-1.jpg', 110),
(303, '1736875184926-CtlhVAGMSt6A2UCIfXcy.png', 111),
(304, '1736875263563-CtlhVAGMSt6A2UCIfXcy.png', 112),
(305, '1736875513889-uK8vaL1RX3yQXzdKxOds.png', 113),
(306, '1736875568043-uK8vaL1RX3yQXzdKxOds.png', 114),
(307, '1736875692246-GdYH7rQkC7oBFBVtK8Eo.png', 115),
(308, '1736875744891-GdYH7rQkC7oBFBVtK8Eo.png', 116),
(309, '1736875895733-zoWiQsqANZSTWkBDBObS.png', 117),
(310, '1736875950345-zoWiQsqANZSTWkBDBObS.png', 118),
(311, '1736876082963-MD9aOATpZZATHs6bq13O.png', 119),
(312, '1736876140705-MD9aOATpZZATHs6bq13O.png', 120),
(313, '1736876234110-NixzB9KBy6r0ybd4mOyr.png', 121),
(314, '1736876281019-NixzB9KBy6r0ybd4mOyr.png', 122),
(315, '1736876852511-fblGkNUyl0NdoObqFvg8.png', 123),
(316, '1736876901968-fblGkNUyl0NdoObqFvg8.png', 124),
(317, '1736876963400-Kw1iav6Uc52J1uVVWJbC.png', 125),
(318, '1736877019104-Kw1iav6Uc52J1uVVWJbC.png', 126),
(319, '1736877076784-D8WMIl6EHn4C26QsqRo0.png', 127),
(320, '1736877133415-D8WMIl6EHn4C26QsqRo0.png', 128),
(321, '1736877234242-S7shGsQE8A9qhwwMGJLy.png', 129),
(322, '1736877276673-S7shGsQE8A9qhwwMGJLy.png', 130),
(323, '1736877390432-Gdf5ZQ4RCZcqli3YlWF5.png', 131),
(324, '1736877452196-Gdf5ZQ4RCZcqli3YlWF5.png', 132),
(325, '1736877564229-KjEDk9YHqLrJ8DAqywGP.png', 133),
(326, '1736877611347-KjEDk9YHqLrJ8DAqywGP.png', 134),
(327, '1736877746769-R85RmxmjFMLD49XpBD7e.png', 135),
(328, '1736877824339-R85RmxmjFMLD49XpBD7e.png', 136),
(329, '1736891983766-1-2.jpg', 137),
(330, '1736891983781-2-3.jpg', 137),
(331, '1736891983782-3-2.jpg', 137),
(332, '1736891983784-6-2.jpg', 137),
(333, '1736891983789-4-2.jpg', 137),
(334, '1736891983790-5-2.jpg', 137),
(340, '1736892264265-1-3.jpg', 139),
(341, '1736892264266-2-4.jpg', 139),
(342, '1736892482658-1-3.jpg', 138),
(343, '1736892482659-2-4.jpg', 138),
(344, '1736892803931-1.jpg', 140),
(345, '1736892803932-2-1.jpg', 140),
(346, '1736892842235-1.jpg', 141),
(347, '1736892842236-2-1.jpg', 141),
(348, '1736893216372-1-1.jpg', 142),
(349, '1736893216373-2-2.jpg', 142),
(350, '1736893247513-1-1.jpg', 143),
(351, '1736893247514-2-2.jpg', 143),
(352, '1736893414767-d6f090df-4aac-453c-8de6-17bcc8b1e0db.jpg', 144),
(353, '1736893414768-WhatsApp-Image-2020-07-11-at-17.48.33-1.jpeg', 144),
(354, '1736893453245-d6f090df-4aac-453c-8de6-17bcc8b1e0db.jpg', 145),
(355, '1736893453246-WhatsApp-Image-2020-07-11-at-17.48.33-1.jpeg', 145),
(356, '1736893533376-1595_Details.jpg', 146),
(357, '1736893533377-1596_Details.jpg', 146),
(358, '1736893578036-1595_Details.jpg', 147),
(359, '1736893578036-1596_Details.jpg', 147),
(360, '1736893682301-1602_Details.jpg', 148),
(361, '1736893682301-1603_Details.jpg', 148),
(362, '1736893717427-1602_Details.jpg', 149),
(363, '1736893717427-1603_Details.jpg', 149),
(364, '1736893852109-coffee-machine-main.jpg', 150),
(365, '1736893885064-coffee-machine-main.jpg', 151),
(366, '1736894045268-Arch.jpg', 152),
(367, '1736894045270-Cruise.jpg', 152),
(368, '1736894045271-Haiku.jpg', 152),
(369, '1736894125536-Cruise.jpg', 153),
(370, '1736894125537-Arch.jpg', 153),
(371, '1736894125540-Haiku.jpg', 153),
(372, '1736894254434-Built-In-Washing-Products.jpg', 154),
(373, '1736894254435-Dryer.jpg', 154),
(374, '1736894311882-Built-In-Washing-Products.jpg', 155),
(375, '1736894311883-Dryer.jpg', 155);

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `sub_category_id` int(11) NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `language` enum('en','ar') NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`sub_category_id`, `sub_category_name`, `language`, `category_id`) VALUES
(1, 'Dining rooms', 'en', 1),
(2, 'Bed rooms', 'en', 1),
(3, 'Guest rooms', 'en', 1),
(4, 'Living rooms', 'en', 1),
(5, 'Kids rooms', 'en', 1),
(6, 'Decorative', 'en', 2),
(7, 'Cupboard', 'en', 2),
(8, 'Open shelves', 'en', 2),
(9, 'Hobs', 'en', 3),
(10, 'Dishwashers', 'en', 3),
(11, 'Cooker hood', 'en', 3),
(12, 'Ovens', 'en', 3),
(13, 'Washing machines', 'en', 3),
(14, 'Refrigerators', 'en', 3),
(15, 'Coffee machines', 'en', 3),
(16, 'Microwaves', 'en', 3),
(26, 'Kitchen', 'en', 3),
(27, 'Freezers', 'en', 3),
(29, 'Fabric', 'en', 14),
(30, 'Colors', 'en', 15),
(31, 'غرف الطعام', 'ar', 16),
(32, 'غرف نوم', 'ar', 16),
(33, 'غرف الضيوف', 'ar', 16),
(34, 'غرف المعيشة', 'ar', 16),
(35, 'غرف الاطفال', 'ar', 16),
(36, 'ديكور', 'ar', 17),
(37, 'الخزائن', 'ar', 17),
(38, 'رفوف مفتوحة', 'ar', 17),
(39, 'مواقد', 'ar', 18),
(40, 'غسالات الصحون', 'ar', 18),
(41, 'اغطية طباخ', 'ar', 18),
(42, 'أفران', 'ar', 18),
(43, 'الغسالات', 'ar', 18),
(44, 'ثلاجات', 'ar', 18),
(45, 'آلات القهوة', 'ar', 18),
(46, 'أفران ميكروويف', 'ar', 18),
(47, 'مطابخ', 'ar', 18),
(48, 'فريزر', 'ar', 18),
(49, 'قماش', 'ar', 22),
(50, 'الالوان', 'ar', 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `product_contact_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `admin_product_fk` (`admin_id`),
  ADD KEY `subcategory_product_fk` (`sub_category_id`),
  ADD KEY `brand_product_fk` (`brand_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_image_fk` (`product_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD KEY `category_subcategory_fk` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=376;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `product_contact_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `admin_product_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `brand_product_fk` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`),
  ADD CONSTRAINT `subcategory_product_fk` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `category_subcategory_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
