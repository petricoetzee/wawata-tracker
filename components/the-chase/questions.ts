import { Question } from './types';

const allQuestions: Question[] = [
  // SCIENCE
  { id: 1, question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
  { id: 2, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctIndex: 2 },
  { id: 3, question: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], correctIndex: 1 },
  { id: 4, question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctIndex: 2 },
  { id: 5, question: "What is the hardest natural substance on Earth?", options: ["Granite", "Quartz", "Diamond", "Titanium"], correctIndex: 2 },
  { id: 6, question: "What is the speed of light in km/s (approximately)?", options: ["100,000", "200,000", "300,000", "400,000"], correctIndex: 2 },
  { id: 7, question: "What element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], correctIndex: 1 },
  { id: 8, question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Lungs"], correctIndex: 2 },
  { id: 9, question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"], correctIndex: 2 },
  { id: 10, question: "What type of animal is a seahorse?", options: ["Mammal", "Crustacean", "Fish", "Reptile"], correctIndex: 2 },
  { id: 11, question: "What planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctIndex: 1 },
  { id: 12, question: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "110°C", "120°C"], correctIndex: 1 },
  { id: 13, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correctIndex: 2 },
  { id: 14, question: "What vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correctIndex: 3 },
  { id: 15, question: "How many chambers does the human heart have?", options: ["Two", "Three", "Four", "Five"], correctIndex: 2 },
  { id: 16, question: "What is the chemical formula for table salt?", options: ["NaO", "NaCl", "KCl", "CaCl"], correctIndex: 1 },
  { id: 17, question: "What is the closest star to Earth?", options: ["Proxima Centauri", "Sirius", "The Sun", "Alpha Centauri"], correctIndex: 2 },
  { id: 18, question: "What part of the brain controls balance?", options: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"], correctIndex: 1 },
  { id: 19, question: "What metal is liquid at room temperature?", options: ["Lead", "Mercury", "Tin", "Zinc"], correctIndex: 1 },
  { id: 20, question: "What is the smallest bone in the human body?", options: ["Stapes", "Hammer", "Anvil", "Phalanx"], correctIndex: 0 },

  // GEOGRAPHY
  { id: 21, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2 },
  { id: 22, question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctIndex: 1 },
  { id: 23, question: "What country has the most people?", options: ["USA", "India", "China", "Indonesia"], correctIndex: 1 },
  { id: 24, question: "In which ocean is the Mariana Trench?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctIndex: 2 },
  { id: 25, question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correctIndex: 1 },
  { id: 26, question: "On which continent is the Sahara Desert?", options: ["Asia", "Africa", "Australia", "South America"], correctIndex: 1 },
  { id: 27, question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correctIndex: 3 },
  { id: 28, question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Thailand", "Japan", "South Korea"], correctIndex: 2 },
  { id: 29, question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctic", "Arabian"], correctIndex: 2 },
  { id: 30, question: "What mountain is the tallest in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correctIndex: 2 },
  { id: 31, question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correctIndex: 2 },
  { id: 32, question: "Which river flows through London?", options: ["Seine", "Danube", "Thames", "Rhine"], correctIndex: 2 },
  { id: 33, question: "What is the largest island in the world?", options: ["Borneo", "Madagascar", "Greenland", "New Guinea"], correctIndex: 2 },
  { id: 34, question: "In which country is Mount Kilimanjaro?", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], correctIndex: 1 },
  { id: 35, question: "What is the capital of New Zealand?", options: ["Auckland", "Christchurch", "Wellington", "Hamilton"], correctIndex: 2 },
  { id: 36, question: "Which strait separates Europe from Africa?", options: ["Bosphorus", "Gibraltar", "Hormuz", "Malacca"], correctIndex: 1 },
  { id: 37, question: "What is the driest continent on Earth?", options: ["Africa", "Australia", "Antarctica", "Asia"], correctIndex: 2 },
  { id: 38, question: "Which country has the longest coastline?", options: ["Russia", "Australia", "Indonesia", "Canada"], correctIndex: 3 },
  { id: 39, question: "What is the capital of South Korea?", options: ["Busan", "Seoul", "Incheon", "Daegu"], correctIndex: 1 },
  { id: 40, question: "Lake Titicaca is on the border of Peru and which country?", options: ["Chile", "Ecuador", "Bolivia", "Colombia"], correctIndex: 2 },

  // HISTORY
  { id: 41, question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctIndex: 2 },
  { id: 42, question: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Yuri Gagarin"], correctIndex: 1 },
  { id: 43, question: "What ancient wonder was located in Alexandria?", options: ["Colossus", "Lighthouse", "Hanging Gardens", "Temple of Artemis"], correctIndex: 1 },
  { id: 44, question: "The Titanic sank in which year?", options: ["1910", "1911", "1912", "1913"], correctIndex: 2 },
  { id: 45, question: "Who painted the ceiling of the Sistine Chapel?", options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], correctIndex: 2 },
  { id: 46, question: "What empire was ruled by Genghis Khan?", options: ["Ottoman", "Roman", "Mongol", "Persian"], correctIndex: 2 },
  { id: 47, question: "In which city was the Declaration of Independence signed?", options: ["New York", "Boston", "Philadelphia", "Washington"], correctIndex: 2 },
  { id: 48, question: "Who was the first female Prime Minister of the UK?", options: ["Theresa May", "Margaret Thatcher", "Queen Victoria", "Mary I"], correctIndex: 1 },
  { id: 49, question: "The Berlin Wall fell in which year?", options: ["1987", "1988", "1989", "1990"], correctIndex: 2 },
  { id: 50, question: "What was the name of the ship the Pilgrims sailed on to America?", options: ["Santa Maria", "Mayflower", "Endeavour", "Beagle"], correctIndex: 1 },
  { id: 51, question: "Who discovered penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Robert Koch"], correctIndex: 1 },
  { id: 52, question: "Which ancient civilisation built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], correctIndex: 2 },
  { id: 53, question: "What year did the French Revolution begin?", options: ["1776", "1789", "1799", "1804"], correctIndex: 1 },
  { id: 54, question: "Who was the first Emperor of Rome?", options: ["Julius Caesar", "Augustus", "Nero", "Caligula"], correctIndex: 1 },
  { id: 55, question: "What was the name of the atomic bomb dropped on Hiroshima?", options: ["Fat Man", "Little Boy", "Trinity", "Gadget"], correctIndex: 1 },
  { id: 56, question: "Which war was fought between the North and South in the US?", options: ["Revolutionary War", "War of 1812", "Civil War", "Mexican War"], correctIndex: 2 },
  { id: 57, question: "Who wrote the Communist Manifesto?", options: ["Lenin", "Stalin", "Karl Marx", "Engels"], correctIndex: 2 },
  { id: 58, question: "What year did humans first land on the Moon?", options: ["1967", "1968", "1969", "1970"], correctIndex: 2 },
  { id: 59, question: "Which queen ruled England for 63 years until 1901?", options: ["Elizabeth I", "Victoria", "Anne", "Mary II"], correctIndex: 1 },
  { id: 60, question: "The Great Fire of London occurred in which year?", options: ["1666", "1676", "1686", "1696"], correctIndex: 0 },

  // ENTERTAINMENT & POP CULTURE
  { id: 61, question: "What is the highest-grossing film of all time (unadjusted)?", options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"], correctIndex: 1 },
  { id: 62, question: "Who played Jack in the movie Titanic?", options: ["Brad Pitt", "Matt Damon", "Leonardo DiCaprio", "Tom Cruise"], correctIndex: 2 },
  { id: 63, question: "What is the name of Batman's butler?", options: ["Jarvis", "Alfred", "Watson", "Jeeves"], correctIndex: 1 },
  { id: 64, question: "In what decade was the first Star Wars film released?", options: ["1960s", "1970s", "1980s", "1990s"], correctIndex: 1 },
  { id: 65, question: "What colour pill does Neo take in The Matrix?", options: ["Blue", "Red", "Green", "White"], correctIndex: 1 },
  { id: 66, question: "Who directed Jurassic Park?", options: ["James Cameron", "George Lucas", "Steven Spielberg", "Ridley Scott"], correctIndex: 2 },
  { id: 67, question: "What fictional country is Black Panther from?", options: ["Genosha", "Wakanda", "Latveria", "Sokovia"], correctIndex: 1 },
  { id: 68, question: "How many films are in the Harry Potter series?", options: ["6", "7", "8", "9"], correctIndex: 2 },
  { id: 69, question: "Who voices Woody in Toy Story?", options: ["Tim Allen", "Tom Hanks", "Robin Williams", "Billy Crystal"], correctIndex: 1 },
  { id: 70, question: "What is the name of the hobbit played by Elijah Wood?", options: ["Bilbo", "Sam", "Frodo", "Pippin"], correctIndex: 2 },
  { id: 71, question: "In Friends, what is the name of Ross's first wife?", options: ["Emily", "Carol", "Rachel", "Julie"], correctIndex: 1 },
  { id: 72, question: "What TV show features a chemistry teacher turned drug dealer?", options: ["Ozark", "Narcos", "Breaking Bad", "The Wire"], correctIndex: 2 },
  { id: 73, question: "Who sang 'Bohemian Rhapsody'?", options: ["The Beatles", "Led Zeppelin", "Queen", "The Rolling Stones"], correctIndex: 2 },
  { id: 74, question: "What instrument does a pianist play?", options: ["Violin", "Guitar", "Piano", "Drums"], correctIndex: 2 },
  { id: 75, question: "What Disney film features the song 'Let It Go'?", options: ["Tangled", "Moana", "Frozen", "Brave"], correctIndex: 2 },
  { id: 76, question: "Who created Mickey Mouse?", options: ["Jim Henson", "Walt Disney", "Chuck Jones", "Tex Avery"], correctIndex: 1 },
  { id: 77, question: "What band was Freddie Mercury the lead singer of?", options: ["The Who", "Queen", "ABBA", "Kiss"], correctIndex: 1 },
  { id: 78, question: "What year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], correctIndex: 2 },
  { id: 79, question: "Who wrote the song 'Imagine'?", options: ["Paul McCartney", "John Lennon", "George Harrison", "Bob Dylan"], correctIndex: 1 },
  { id: 80, question: "In The Simpsons, what is Homer's middle name?", options: ["James", "Jay", "John", "Joseph"], correctIndex: 1 },

  // SPORTS
  { id: 81, question: "How many players are on a football (soccer) team?", options: ["9", "10", "11", "12"], correctIndex: 2 },
  { id: 82, question: "In tennis, what is a score of zero called?", options: ["Nil", "Love", "Duck", "Nought"], correctIndex: 1 },
  { id: 83, question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "UK", "Brazil", "Japan"], correctIndex: 2 },
  { id: 84, question: "How many rings are on the Olympic flag?", options: ["4", "5", "6", "7"], correctIndex: 1 },
  { id: 85, question: "In which sport would you perform a slam dunk?", options: ["Volleyball", "Tennis", "Basketball", "Handball"], correctIndex: 2 },
  { id: 86, question: "What country invented cricket?", options: ["Australia", "India", "England", "South Africa"], correctIndex: 2 },
  { id: 87, question: "How long is a marathon in miles (approximately)?", options: ["20.2", "24.2", "26.2", "28.2"], correctIndex: 2 },
  { id: 88, question: "What sport is played at Wimbledon?", options: ["Golf", "Cricket", "Tennis", "Polo"], correctIndex: 2 },
  { id: 89, question: "Which country has won the most FIFA World Cups?", options: ["Germany", "Italy", "Argentina", "Brazil"], correctIndex: 3 },
  { id: 90, question: "In golf, what is one under par called?", options: ["Eagle", "Birdie", "Bogey", "Albatross"], correctIndex: 1 },
  { id: 91, question: "How many points is a try worth in rugby union?", options: ["3", "4", "5", "6"], correctIndex: 2 },
  { id: 92, question: "What sport uses the term 'strike' and 'spare'?", options: ["Baseball", "Bowling", "Cricket", "Darts"], correctIndex: 1 },
  { id: 93, question: "Which boxing weight class is the heaviest?", options: ["Middleweight", "Cruiserweight", "Heavyweight", "Light heavyweight"], correctIndex: 2 },
  { id: 94, question: "What is the national sport of Japan?", options: ["Judo", "Karate", "Sumo", "Kendo"], correctIndex: 2 },
  { id: 95, question: "How many sets does a player need to win a men's Wimbledon final?", options: ["2", "3", "4", "5"], correctIndex: 1 },

  // LITERATURE
  { id: 96, question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctIndex: 1 },
  { id: 97, question: "What is the first book of the Bible?", options: ["Exodus", "Leviticus", "Genesis", "Numbers"], correctIndex: 2 },
  { id: 98, question: "Who wrote '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correctIndex: 1 },
  { id: 99, question: "What is the name of Sherlock Holmes's assistant?", options: ["Watson", "Hudson", "Lestrade", "Moriarty"], correctIndex: 0 },
  { id: 100, question: "Who wrote 'Pride and Prejudice'?", options: ["Emily Brontë", "Jane Austen", "Virginia Woolf", "Mary Shelley"], correctIndex: 1 },
  { id: 101, question: "In which Shakespeare play does the character Hamlet appear?", options: ["Macbeth", "Othello", "Hamlet", "King Lear"], correctIndex: 2 },
  { id: 102, question: "Who wrote 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], correctIndex: 1 },
  { id: 103, question: "What animal is Aslan in The Chronicles of Narnia?", options: ["Bear", "Eagle", "Lion", "Wolf"], correctIndex: 2 },
  { id: 104, question: "Who wrote 'A Tale of Two Cities'?", options: ["Thomas Hardy", "Charles Dickens", "Oscar Wilde", "H.G. Wells"], correctIndex: 1 },
  { id: 105, question: "What is the real name of Dr. Seuss?", options: ["Theodore Geisel", "Samuel Clemens", "Eric Blair", "Charles Dodgson"], correctIndex: 0 },
  { id: 106, question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Truman Capote", "John Updike", "Flannery O'Connor"], correctIndex: 0 },
  { id: 107, question: "In which century was Don Quixote written?", options: ["15th", "16th", "17th", "18th"], correctIndex: 2 },
  { id: 108, question: "What is Captain Ahab hunting in Moby-Dick?", options: ["A shark", "A whale", "A squid", "A sea serpent"], correctIndex: 1 },

  // FOOD & DRINK
  { id: 109, question: "What country is Parmesan cheese originally from?", options: ["France", "Spain", "Italy", "Switzerland"], correctIndex: 2 },
  { id: 110, question: "What is the main ingredient in hummus?", options: ["Lentils", "Chickpeas", "Kidney beans", "Peas"], correctIndex: 1 },
  { id: 111, question: "Champagne comes from which country?", options: ["Italy", "Spain", "France", "Germany"], correctIndex: 2 },
  { id: 112, question: "What fruit is traditionally used in a Waldorf salad?", options: ["Pear", "Apple", "Orange", "Grape"], correctIndex: 1 },
  { id: 113, question: "What is sushi traditionally wrapped in?", options: ["Rice paper", "Bamboo leaves", "Seaweed", "Lettuce"], correctIndex: 2 },
  { id: 114, question: "What nut is marzipan made from?", options: ["Cashew", "Walnut", "Almond", "Pistachio"], correctIndex: 2 },
  { id: 115, question: "What spirit is used in a Mojito?", options: ["Vodka", "Gin", "Tequila", "Rum"], correctIndex: 3 },
  { id: 116, question: "What bean is chocolate made from?", options: ["Coffee", "Cacao", "Vanilla", "Soy"], correctIndex: 1 },
  { id: 117, question: "Which country is the origin of the croissant?", options: ["France", "Austria", "Italy", "Belgium"], correctIndex: 1 },
  { id: 118, question: "What is tofu made from?", options: ["Rice", "Wheat", "Soybeans", "Corn"], correctIndex: 2 },
  { id: 119, question: "What country does Gouda cheese come from?", options: ["Belgium", "Germany", "Netherlands", "Denmark"], correctIndex: 2 },
  { id: 120, question: "What herb is pesto traditionally made with?", options: ["Parsley", "Cilantro", "Basil", "Mint"], correctIndex: 2 },

  // NATURE & ANIMALS
  { id: 121, question: "What is the largest mammal on Earth?", options: ["African elephant", "Blue whale", "Giraffe", "Hippo"], correctIndex: 1 },
  { id: 122, question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correctIndex: 1 },
  { id: 123, question: "What is a baby kangaroo called?", options: ["Cub", "Kit", "Joey", "Pup"], correctIndex: 2 },
  { id: 124, question: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Gazelle", "Horse"], correctIndex: 1 },
  { id: 125, question: "What do caterpillars turn into?", options: ["Moths or butterflies", "Beetles", "Dragonflies", "Bees"], correctIndex: 0 },
  { id: 126, question: "What is the tallest animal in the world?", options: ["Elephant", "Giraffe", "Ostrich", "Camel"], correctIndex: 1 },
  { id: 127, question: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], correctIndex: 2 },
  { id: 128, question: "What type of animal is a Komodo dragon?", options: ["Dinosaur", "Lizard", "Snake", "Crocodilian"], correctIndex: 1 },
  { id: 129, question: "What is the largest species of penguin?", options: ["King", "Emperor", "Gentoo", "Macaroni"], correctIndex: 1 },
  { id: 130, question: "Which bird can fly backwards?", options: ["Swift", "Hummingbird", "Kingfisher", "Swallow"], correctIndex: 1 },
  { id: 131, question: "What is a group of wolves called?", options: ["Herd", "Flock", "Pack", "Pod"], correctIndex: 2 },
  { id: 132, question: "What animal has the longest lifespan?", options: ["Elephant", "Giant tortoise", "Bowhead whale", "Parrot"], correctIndex: 1 },
  { id: 133, question: "What colour is a polar bear's skin?", options: ["White", "Pink", "Black", "Grey"], correctIndex: 2 },
  { id: 134, question: "Which mammal can truly fly?", options: ["Flying squirrel", "Sugar glider", "Bat", "Colugo"], correctIndex: 2 },
  { id: 135, question: "What is the largest species of shark?", options: ["Great white", "Hammerhead", "Whale shark", "Tiger shark"], correctIndex: 2 },

  // MUSIC
  { id: 136, question: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], correctIndex: 2 },
  { id: 137, question: "What instrument has 88 keys?", options: ["Organ", "Accordion", "Piano", "Harpsichord"], correctIndex: 2 },
  { id: 138, question: "Which country is famous for flamenco music?", options: ["Portugal", "Spain", "Italy", "Mexico"], correctIndex: 1 },
  { id: 139, question: "What does 'forte' mean in music?", options: ["Slow", "Fast", "Loud", "Soft"], correctIndex: 2 },
  { id: 140, question: "Who composed 'The Four Seasons'?", options: ["Mozart", "Bach", "Vivaldi", "Beethoven"], correctIndex: 2 },
  { id: 141, question: "What genre of music originated in Jamaica?", options: ["Salsa", "Samba", "Reggae", "Bossa nova"], correctIndex: 2 },
  { id: 142, question: "How many musicians are in a quartet?", options: ["3", "4", "5", "6"], correctIndex: 1 },
  { id: 143, question: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Prince", "Michael Jackson", "Stevie Wonder"], correctIndex: 2 },
  { id: 144, question: "What instrument is Yo-Yo Ma famous for playing?", options: ["Violin", "Cello", "Viola", "Double bass"], correctIndex: 1 },
  { id: 145, question: "Which Beethoven symphony is known as the 'Pastoral'?", options: ["3rd", "5th", "6th", "9th"], correctIndex: 2 },

  // GENERAL KNOWLEDGE
  { id: 146, question: "What colour are the stars on the American flag?", options: ["Red", "Blue", "White", "Gold"], correctIndex: 2 },
  { id: 147, question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correctIndex: 1 },
  { id: 148, question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correctIndex: 2 },
  { id: 149, question: "What language has the most native speakers?", options: ["English", "Hindi", "Mandarin Chinese", "Spanish"], correctIndex: 2 },
  { id: 150, question: "How many continents are there?", options: ["5", "6", "7", "8"], correctIndex: 2 },
  { id: 151, question: "What shape is a stop sign?", options: ["Circle", "Square", "Hexagon", "Octagon"], correctIndex: 3 },
  { id: 152, question: "How many days are in a leap year?", options: ["364", "365", "366", "367"], correctIndex: 2 },
  { id: 153, question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctIndex: 2 },
  { id: 154, question: "What zodiac sign comes first in the calendar year?", options: ["Aquarius", "Capricorn", "Pisces", "Aries"], correctIndex: 1 },
  { id: 155, question: "In Roman numerals, what does 'C' represent?", options: ["50", "100", "500", "1000"], correctIndex: 1 },
  { id: 156, question: "How many degrees are in a right angle?", options: ["45", "90", "180", "360"], correctIndex: 1 },
  { id: 157, question: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Franc", "Pound sterling"], correctIndex: 3 },
  { id: 158, question: "What colour do you get mixing red and yellow?", options: ["Green", "Purple", "Orange", "Brown"], correctIndex: 2 },
  { id: 159, question: "How many teeth does an adult human typically have?", options: ["28", "30", "32", "34"], correctIndex: 2 },
  { id: 160, question: "What is the largest continent?", options: ["Africa", "North America", "Europe", "Asia"], correctIndex: 3 },

  // MORE SCIENCE
  { id: 161, question: "What gas makes up most of the Sun?", options: ["Helium", "Hydrogen", "Oxygen", "Carbon"], correctIndex: 1 },
  { id: 162, question: "What is the pH of pure water?", options: ["5", "6", "7", "8"], correctIndex: 2 },
  { id: 163, question: "What planet is closest to the Sun?", options: ["Venus", "Mercury", "Mars", "Earth"], correctIndex: 1 },
  { id: 164, question: "What force keeps us on the ground?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], correctIndex: 2 },
  { id: 165, question: "What is the chemical symbol for iron?", options: ["Ir", "In", "I", "Fe"], correctIndex: 3 },
  { id: 166, question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctIndex: 1 },
  { id: 167, question: "What does DNA stand for?", options: ["Deoxyribonucleic acid", "Dinitrogen acid", "Dynamic nucleic acid", "Dual nitrogen acid"], correctIndex: 0 },
  { id: 168, question: "What colour is chlorophyll?", options: ["Yellow", "Blue", "Green", "Red"], correctIndex: 2 },

  // MORE GEOGRAPHY
  { id: 169, question: "What is the capital of Egypt?", options: ["Alexandria", "Cairo", "Luxor", "Giza"], correctIndex: 1 },
  { id: 170, question: "What ocean lies between Europe and America?", options: ["Pacific", "Indian", "Atlantic", "Arctic"], correctIndex: 2 },
  { id: 171, question: "Which US state is the largest by area?", options: ["Texas", "California", "Montana", "Alaska"], correctIndex: 3 },
  { id: 172, question: "What is the capital of Thailand?", options: ["Bangkok", "Hanoi", "Jakarta", "Manila"], correctIndex: 0 },
  { id: 173, question: "Which European country is shaped like a boot?", options: ["Spain", "Greece", "Italy", "Portugal"], correctIndex: 2 },
  { id: 174, question: "What is the longest wall in the world?", options: ["Hadrian's Wall", "Berlin Wall", "Great Wall of China", "Western Wall"], correctIndex: 2 },
  { id: 175, question: "In which country is the Taj Mahal?", options: ["Pakistan", "Bangladesh", "India", "Nepal"], correctIndex: 2 },

  // MORE ENTERTAINMENT
  { id: 176, question: "What is the name of Harry Potter's owl?", options: ["Errol", "Hedwig", "Pigwidgeon", "Fawkes"], correctIndex: 1 },
  { id: 177, question: "Who played Iron Man in the Marvel films?", options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"], correctIndex: 2 },
  { id: 178, question: "What animated film features a clownfish named Nemo?", options: ["Shark Tale", "Finding Nemo", "The Little Mermaid", "Moana"], correctIndex: 1 },
  { id: 179, question: "In which decade was the TV show 'Seinfeld' first broadcast?", options: ["1970s", "1980s", "1990s", "2000s"], correctIndex: 1 },
  { id: 180, question: "Who directed 'The Godfather'?", options: ["Martin Scorsese", "Francis Ford Coppola", "Brian De Palma", "Woody Allen"], correctIndex: 1 },
  { id: 181, question: "What is the name of the fictional school in Harry Potter?", options: ["Narnia Academy", "Hogwarts", "Xavier Institute", "Brakebills"], correctIndex: 1 },
  { id: 182, question: "Which superhero is also known as Diana Prince?", options: ["Black Widow", "Captain Marvel", "Wonder Woman", "Supergirl"], correctIndex: 2 },
  { id: 183, question: "What colour lightsaber does Luke Skywalker first use?", options: ["Green", "Blue", "Red", "Purple"], correctIndex: 1 },

  // MORE HISTORY
  { id: 184, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], correctIndex: 2 },
  { id: 185, question: "What ancient structure is located at Giza in Egypt?", options: ["Colosseum", "Parthenon", "Great Pyramid", "Stonehenge"], correctIndex: 2 },
  { id: 186, question: "What war began in 1914?", options: ["World War I", "World War II", "Boer War", "Crimean War"], correctIndex: 0 },
  { id: 187, question: "Who was known as the Iron Lady?", options: ["Angela Merkel", "Indira Gandhi", "Margaret Thatcher", "Golda Meir"], correctIndex: 2 },
  { id: 188, question: "What empire built the Colosseum in Rome?", options: ["Greek", "Roman", "Byzantine", "Ottoman"], correctIndex: 1 },
  { id: 189, question: "In what century did Columbus sail to the Americas?", options: ["14th", "15th", "16th", "17th"], correctIndex: 1 },
  { id: 190, question: "Who invented the telephone?", options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"], correctIndex: 2 },

  // MORE GENERAL KNOWLEDGE
  { id: 191, question: "What colour is the 'M' in McDonald's?", options: ["Red", "Yellow", "White", "Orange"], correctIndex: 1 },
  { id: 192, question: "How many cards are in a standard deck (excluding jokers)?", options: ["48", "50", "52", "54"], correctIndex: 2 },
  { id: 193, question: "What is the main language spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], correctIndex: 1 },
  { id: 194, question: "What is the hardest rock?", options: ["Granite", "Obsidian", "Diamond", "Marble"], correctIndex: 2 },
  { id: 195, question: "What chess piece can only move diagonally?", options: ["Rook", "Knight", "Bishop", "Queen"], correctIndex: 2 },
  { id: 196, question: "How many colours are in a rainbow?", options: ["5", "6", "7", "8"], correctIndex: 2 },
  { id: 197, question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctIndex: 3 },
  { id: 198, question: "Which hand do most people write with?", options: ["Left", "Right", "Both equally", "Neither"], correctIndex: 1 },
  { id: 199, question: "What are the three primary colours of light?", options: ["Red, yellow, blue", "Red, green, blue", "Red, green, yellow", "Cyan, magenta, yellow"], correctIndex: 1 },
  { id: 200, question: "What number does the Roman numeral 'X' represent?", options: ["5", "10", "50", "100"], correctIndex: 1 },
  { id: 201, question: "What is the freezing point of water in Fahrenheit?", options: ["0°F", "20°F", "32°F", "40°F"], correctIndex: 2 },
  { id: 202, question: "Which planet is known for its rings?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctIndex: 1 },
  { id: 203, question: "What material is a traditional Japanese kimono made from?", options: ["Cotton", "Wool", "Silk", "Linen"], correctIndex: 2 },
  { id: 204, question: "In what city is the Eiffel Tower?", options: ["London", "Rome", "Paris", "Berlin"], correctIndex: 2 },
  { id: 205, question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Lime", "Pepper"], correctIndex: 1 },
  { id: 206, question: "Which country gave the Statue of Liberty to the USA?", options: ["England", "Spain", "France", "Germany"], correctIndex: 2 },
  { id: 207, question: "What is the most widely spoken language in the world?", options: ["Spanish", "Mandarin", "English", "Hindi"], correctIndex: 2 },
  { id: 208, question: "How many minutes are in an hour?", options: ["30", "45", "60", "90"], correctIndex: 2 },
  { id: 209, question: "What is the currency of India?", options: ["Rupee", "Ringgit", "Ruble", "Real"], correctIndex: 0 },
  { id: 210, question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctIndex: 2 },
  { id: 211, question: "What flower is associated with remembrance in Commonwealth countries?", options: ["Rose", "Lily", "Poppy", "Daisy"], correctIndex: 2 },
  { id: 212, question: "What is the national animal of Scotland?", options: ["Lion", "Stag", "Unicorn", "Eagle"], correctIndex: 2 },
  { id: 213, question: "How many Great Lakes are there?", options: ["3", "4", "5", "6"], correctIndex: 2 },
  { id: 214, question: "What is the largest South American country by area?", options: ["Argentina", "Colombia", "Brazil", "Peru"], correctIndex: 2 },
  { id: 215, question: "What colour jersey does the leader of the Tour de France wear?", options: ["Red", "Blue", "Yellow", "Green"], correctIndex: 2 },
  { id: 216, question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Botticelli"], correctIndex: 2 },
  { id: 217, question: "What are the two longest rivers in Africa?", options: ["Nile and Congo", "Nile and Niger", "Congo and Zambezi", "Niger and Zambezi"], correctIndex: 0 },
  { id: 218, question: "What country is the origin of the Olympic Games?", options: ["Italy", "Greece", "Turkey", "Egypt"], correctIndex: 1 },
  { id: 219, question: "What is the national bird of the United States?", options: ["Robin", "Eagle", "Hawk", "Falcon"], correctIndex: 1 },
  { id: 220, question: "What year did the Berlin Wall come down?", options: ["1987", "1988", "1989", "1991"], correctIndex: 2 },
];

export function getShuffledQuestions(usedIds: Set<number>): Question[] {
  const available = allQuestions.filter(q => !usedIds.has(q.id));
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  return available;
}

export function getHeadToHeadQuestions(usedIds: Set<number>): Question[] {
  // For head-to-head, return questions with only 3 options (A, B, C)
  const available = allQuestions.filter(q => !usedIds.has(q.id));
  const h2hQuestions = available.map(q => {
    // Keep first 3 options, adjust correctIndex if needed
    if (q.correctIndex < 3) {
      return { ...q, options: q.options.slice(0, 3) };
    }
    // If correct answer is the 4th option, swap it with a random incorrect one
    const newOptions = [...q.options.slice(0, 3)];
    const swapIdx = Math.floor(Math.random() * 3);
    newOptions[swapIdx] = q.options[q.correctIndex];
    return { ...q, options: newOptions, correctIndex: swapIdx };
  });
  for (let i = h2hQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [h2hQuestions[i], h2hQuestions[j]] = [h2hQuestions[j], h2hQuestions[i]];
  }
  return h2hQuestions;
}

export const totalQuestionCount = allQuestions.length;
