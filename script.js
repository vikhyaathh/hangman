
const WORDS = {"Technology": ["keyboard", "monitor", "processor", "bluetooth", "smartphone", "laptop", "charger", "speaker", "headphones", "microphone", "camera", "router", "server", "printer", "scanner", "battery", "calculator", "television", "satellite", "antenna", "transistor", "capacitor", "semiconductor", "motherboard", "harddisk", "pendrive", "projector", "smartwatch", "earphones", "touchscreen", "internet", "network", "software", "hardware", "database", "algorithm", "compiler", "browser", "firewall", "bandwidth", "ethernet", "wireless", "infrared", "processor", "graphics", "joystick", "webcam", "modem", "cursor", "pixel"], "Science": ["gravity", "neutron", "telescope", "asteroid", "volcano", "electron", "proton", "magnet", "rainbow", "thunder", "lightning", "hurricane", "earthquake", "tsunami", "glacier", "atmosphere", "radiation", "particle", "nucleus", "comet", "meteor", "planet", "galaxy", "nebula", "supernova", "diamond", "crystal", "element", "compound", "mineral", "oxygen", "hydrogen", "nitrogen", "carbon", "calcium", "chromosome", "organism", "bacteria", "virus", "antibiotic", "photon", "quantum", "isotope", "molecule", "atom", "fossil", "evolution", "ecosystem", "biodiversity", "thermodynamics"], "Countries": ["india", "brazil", "canada", "germany", "australia", "france", "japan", "china", "russia", "mexico", "italy", "spain", "argentina", "egypt", "nigeria", "kenya", "turkey", "sweden", "norway", "finland", "portugal", "austria", "belgium", "denmark", "greece", "poland", "ukraine", "vietnam", "thailand", "malaysia", "indonesia", "pakistan", "bangladesh", "srilanka", "nepal", "singapore", "newzealand", "southafrica", "morocco", "ethiopia", "colombia", "venezuela", "peru", "chile", "ecuador", "hungary", "romania", "croatia", "slovakia", "slovenia"], "Medical": ["fever", "fracture", "insulin", "vaccine", "antibiotics", "surgery", "bandage", "capsule", "tablet", "injection", "hospital", "doctor", "patient", "disease", "infection", "stethoscope", "thermometer", "heartbeat", "skeleton", "muscle", "kidney", "stomach", "liver", "lungs", "brain", "blood", "oxygen", "calcium", "protein", "vitamin", "diabetes", "asthma", "malaria", "typhoid", "cholera", "cancer", "tumour", "allergy", "migraine", "arthritis", "anaemia", "jaundice", "pneumonia", "bronchitis", "meningitis", "cataract", "glaucoma", "appendix", "gallstone", "hernia"], "Arts": ["painting", "sculpture", "portrait", "canvas", "gallery", "museum", "sketch", "drawing", "watercolor", "charcoal", "pottery", "mosaic", "mural", "fresco", "tapestry", "origami", "calligraphy", "graffiti", "cartoon", "animation", "theatre", "ballet", "opera", "cinema", "photography", "architecture", "design", "fashion", "jewellery", "crafts", "symphony", "orchestra", "sonata", "concerto", "manuscript", "literature", "poetry", "novel", "biography", "mythology", "comedy", "tragedy", "satire", "folklore", "epic", "figurine", "collage", "lithograph", "etching", "engraving"], "Animals": ["elephant", "penguin", "cheetah", "dolphin", "crocodile", "giraffe", "kangaroo", "flamingo", "chimpanzee", "gorilla", "leopard", "rhinoceros", "hippopotamus", "orangutan", "peacock", "octopus", "jellyfish", "seahorse", "starfish", "lobster", "butterfly", "dragonfly", "grasshopper", "scorpion", "tarantula", "eagle", "parrot", "ostrich", "albatross", "pelican", "wolverine", "armadillo", "platypus", "chameleon", "iguana", "piranha", "barracuda", "swordfish", "stingray", "woodpecker", "chimpanzee", "baboon", "mandrill", "meerkat", "mongoose", "hedgehog", "porcupine", "capybara", "kingfisher", "anteater"], "Sports": ["cricket", "football", "basketball", "badminton", "swimming", "tennis", "volleyball", "baseball", "hockey", "rugby", "boxing", "wrestling", "gymnastics", "cycling", "archery", "marathon", "sprinting", "weightlifting", "skateboarding", "surfing", "skiing", "snowboarding", "rowing", "kayaking", "fencing", "handball", "squash", "polo", "golf", "billiards", "taekwondo", "karate", "judo", "aikido", "kickboxing", "triathlon", "pentathlon", "decathlon", "heptathlon", "steeplechase", "bobsled", "luge", "curling", "biathlon", "skeleton", "lacrosse", "netball", "softball", "kabaddi", "kho"], "Food": ["pizza", "biryani", "sushi", "burger", "lasagna", "pasta", "tacos", "ramen", "paella", "moussaka", "croissant", "waffle", "pancake", "dumpling", "kebab", "samosa", "hummus", "falafel", "risotto", "tiramisu", "cheesecake", "brownie", "macaroon", "churros", "gelato", "shawarma", "poutine", "schnitzel", "tempura", "satay", "gyoza", "baklava", "fries", "goulash", "paella", "enchilada", "burrito", "quesadilla", "guacamole", "nachos", "carbonara", "bruschetta", "sandwich", "antipasto", "soup", "noodles", "bibimbap", "kimchi", "tandoori", "dosa"]};
let category = Object.keys(WORDS)[0], answer="", guessed=new Set(), lives=6, gameOver=false;

const $ = id => document.getElementById(id);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

Object.keys(WORDS).forEach((c,i)=>{
  const b=document.createElement("button");
  b.className="category"+(i===0?" active":"");
  b.textContent=c;
  b.onclick=()=>{
    category=c;
    document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
  };
  $("categories").appendChild(b);
});

function pickWord(){
  const list=WORDS[category]||[];
  answer=(list[Math.floor(Math.random()*list.length)]||"hangman").toLowerCase();
}
function render(){
  $("word").textContent=answer.split("").map(x=>guessed.has(x)?x.toUpperCase():"_").join(" ");
  $("lives").textContent=lives;
  $("categoryLabel").textContent=category;
  const won=[...new Set(answer)].every(x=>guessed.has(x));
  if(won) finish(true);
  if(lives<=0) finish(false);
  $("aiSuggestion").textContent=bestGuess();
  document.querySelectorAll(".letter").forEach(b=>b.disabled=guessed.has(b.dataset.l));
}
function bestGuess(){
  const remaining=alphabet.map(x=>x.toLowerCase()).filter(x=>!guessed.has(x));
  const freq={e:12.7,t:9.1,a:8.2,o:7.5,i:7,n:6.7,s:6.3,h:6.1,r:6,d:4,c:4,u:2.8,l:4,g:2.4,p:1.9,m:2.4,y:2,z:.1,q:.1,j:.15,x:.15,k:.8,w:2.4,v:1};
  return (remaining.sort((a,b)=>(freq[b]||0)-(freq[a]||0))[0]||"—").toUpperCase();
}
function guess(letter){
  if(gameOver||guessed.has(letter))return;
  guessed.add(letter);
  if(!answer.includes(letter))lives--;
  render();
}
function finish(won){
  if(gameOver)return;
  gameOver=true;
  $("message").textContent=won?"🎉 You solved it!":"Game over — the word was "+answer.toUpperCase()+".";
  document.querySelectorAll(".letter").forEach(b=>b.disabled=true);
}
function newGame(){
  pickWord(); guessed=new Set(); lives=6; gameOver=false; $("message").textContent="Choose a letter.";
  $("setup").classList.add("hidden"); $("game").classList.remove("hidden");
  const box=$("letters"); box.innerHTML="";
  alphabet.forEach(x=>{const b=document.createElement("button");b.className="letter";b.textContent=x;b.dataset.l=x.toLowerCase();b.onclick=()=>guess(x.toLowerCase());box.appendChild(b)});
  render();
}
$("startBtn").onclick=newGame;
$("newBtn").onclick=newGame;
$("restartBtn").onclick=()=>{gameOver=true;$("game").classList.add("hidden");$("setup").classList.remove("hidden")};
$("aiBtn").onclick=()=>guess(bestGuess().toLowerCase());
