import { useState, useRef, useEffect } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');`;

const T = {
  terra:"#C2714F", terraLight:"#E8C4B0", terraDark:"#8B4A2F",
  gold:"#D4A853", cream:"#FAF7F2", dark:"#1C1917", muted:"#78716C", border:"#E7E0D8",
  dmBg:"#0F0E0D", dmCard:"#1C1917", dmBorder:"#2C2825", dmMuted:"#A8A29E",
};

const USERS = [
  {id:1,name:"Amara Diallo",handle:"amaradiallo",gradA:"#C2714F",gradB:"#8B4A2F",bio:"Lagos → Paris. Vintage collector & colour chaser.",followers:2841,following:312},
  {id:2,name:"Kenji Mori",handle:"kenjimori",gradA:"#2D3748",gradB:"#1A202C",bio:"Tokyo street style. Quiet luxury & loud sneakers.",followers:5120,following:201},
  {id:3,name:"Sofia Reyes",handle:"sofiareyes",gradA:"#718096",gradB:"#4A5568",bio:"Lisbon light. Mediterranean minimalism.",followers:1390,following:445},
  {id:4,name:"Zara Müller",handle:"zaramuller",gradA:"#1C1917",gradB:"#44403C",bio:"Berlin nights. Black is my neutral.",followers:3200,following:188},
];

const STORIES = [
  {user:"amaradiallo",gradA:"#C2714F",gradB:"#8B4A2F",label:"Paris AM"},
  {user:"kenjimori",gradA:"#2D3748",gradB:"#1A202C",label:"Tokyo"},
  {user:"sofiareyes",gradA:"#718096",gradB:"#4A5568",label:"Lisbon"},
  {user:"zaramuller",gradA:"#1C1917",gradB:"#44403C",label:"Berlin"},
  {user:"me",gradA:T.terra,gradB:T.terraDark,label:"Your Story"},
];

const INIT_POSTS = [
  {id:1,userId:2,caption:"Rainy Shibuya calls for full layering.",location:"Tokyo",time:"2h ago",likes:214,liked:false,comments:[{user:"amaradiallo",text:"This layering!! 🔥"}],outfit:["Beige trench","Black turtleneck","Wide trousers","White sneakers"],color:"#2D3748",photo:null},
  {id:2,userId:1,caption:"Market morning in the Marais. Always terracotta.",location:"Paris",time:"5h ago",likes:389,liked:false,comments:[{user:"sofiareyes",text:"The bag!! Where is it from?"}],outfit:["Rust linen set","Leather mules","Straw tote"],color:T.terra,photo:null},
  {id:3,userId:3,caption:"Sunday slow. Alfama wandering.",location:"Lisbon",time:"1d ago",likes:172,liked:false,comments:[],outfit:["White shirt","Linen trousers","Sandals"],color:"#718096",photo:null},
  {id:4,userId:4,caption:"Berlin at 3am hits different.",location:"Berlin",time:"2d ago",likes:441,liked:false,comments:[{user:"kenjimori",text:"The fit 🖤"}],outfit:["Black coat","Black turtleneck","Black trousers","Chunky boots"],color:"#1C1917",photo:null},
];

const CLOSET_INIT = {
  tops:[{id:1,name:"Cream linen shirt",color:"#F5F0E8",emoji:"👕",photo:null},{id:2,name:"Rust ribbed tank",color:"#C2714F",emoji:"🎽",photo:null},{id:3,name:"Black turtleneck",color:"#1C1917",emoji:"👕",photo:null}],
  bottoms:[{id:4,name:"Ecru wide trousers",color:"#E8E0D0",emoji:"👖",photo:null},{id:5,name:"Denim midi skirt",color:"#4A6FA5",emoji:"🩳",photo:null}],
  shoes:[{id:6,name:"Tan leather mules",color:"#A0785A",emoji:"👡",photo:null},{id:7,name:"White sneakers",color:"#F0F0F0",emoji:"👟",photo:null}],
  accessories:[{id:8,name:"Straw market tote",color:"#D4A853",emoji:"👜",photo:null},{id:9,name:"Gold hoops",color:"#D4A853",emoji:"💛",photo:null}],
};

const EVENTS = [
  {id:1,name:"Beyoncé — Renaissance Tour",city:"Atlanta, GA",date:"Apr 12",type:"Concert",vibe:"Futuristic Glam",dressCode:"Silver, metallics, bodycon, thigh-highs. Think alien diva meets disco era.",tags:["Metallic","Silver","Bodycon","Statement Boot"],color:"#1A1A2E",outfits:[{user:"amaradiallo",gradA:"#C2714F",gradB:"#8B4A2F",look:"Silver slip dress + thigh-high boots + chrome bag",likes:312},{user:"zaramuller",gradA:"#1C1917",gradB:"#44403C",look:"Sequin co-ord + silver platforms + hoop earrings",likes:228}]},
  {id:2,name:"Coachella Weekend 2",city:"Indio, CA",date:"Apr 19–21",type:"Festival",vibe:"Desert Maximalist",dressCode:"Crochet, fringe, bold prints, bucket hats, platform sandals.",tags:["Crochet","Fringe","Boho","Platform"],color:"#7B4F2E",outfits:[{user:"sofiareyes",gradA:"#718096",gradB:"#4A5568",look:"Fringe vest + wide-leg jeans + cowboy boots",likes:445},{user:"kenjimori",gradA:"#2D3748",gradB:"#1A202C",look:"Printed wide pants + linen shirt + bucket hat",likes:189}]},
  {id:3,name:"Milan Fashion Week SS26",city:"Milan, Italy",date:"May 3–9",type:"Fashion Week",vibe:"Quiet Luxury Editorial",dressCode:"Tailored minimalism. Camel, ivory, chocolate. Let the cut do the talking.",tags:["Tailored","Minimalist","Camel","Structured"],color:"#3D2B1F",outfits:[{user:"amaradiallo",gradA:"#C2714F",gradB:"#8B4A2F",look:"Camel longline coat + ivory trousers + loafers",likes:612}]},
  {id:4,name:"Rolling Loud Miami",city:"Miami, FL",date:"May 16–18",type:"Festival",vibe:"Street Flex",dressCode:"Streetwear at its loudest. Jerseys, cargo, fresh sneakers, gold chains.",tags:["Streetwear","Cargo","Sneakers","Gold"],color:"#1A2A1A",outfits:[{user:"kenjimori",gradA:"#2D3748",gradB:"#1A202C",look:"Vintage jersey + cargo shorts + Air Force 1s",likes:334}]},
  {id:5,name:"The Met Gala After-Party",city:"New York, NY",date:"May 5",type:"Party",vibe:"Avant-Garde Dark",dressCode:"Dramatic silhouettes, dark palette, sheer, feathers, all black.",tags:["All Black","Sheer","Dramatic","Feathers"],color:"#0D0D0D",outfits:[{user:"zaramuller",gradA:"#1C1917",gradB:"#44403C",look:"Black sheer maxi + corset + heeled mules",likes:521}]},
  {id:6,name:"Afrobeats Festival NYC",city:"New York, NY",date:"Jun 7",type:"Concert",vibe:"Maximum Colour",dressCode:"Ankara prints, bold accessories, vibrant co-ords. More colour = more power.",tags:["Ankara","Prints","Bold","Accessories"],color:"#8B2500",outfits:[{user:"amaradiallo",gradA:"#C2714F",gradB:"#8B4A2F",look:"Ankara wrap dress + gold bangles + block heels",likes:478}]},
];

const CITY_STYLES = {
  Paris:{emoji:"🇫🇷",coords:{x:48,y:28},desc:"Effortless nonchalance. Neutral tones, tailored silhouettes, a silk scarf tied just so.",looks:["Trench + white tee + loafers","Blazer dress + ballet flats","High-waist trousers + tucked knit"],vibe:"Old Money Romance",palette:["#C8B89A","#2D2D2D","#8B7355"]},
  London:{emoji:"🇬🇧",coords:{x:44,y:24},desc:"Art of dressing for rain while pretending it isn't. Trench coats, Chelsea boots, cheerful disregard for matching.",looks:["Trench + chunky boots + plaid trousers","Leather jacket + floral midi dress","Oversized knit + tailored shorts + tights"],vibe:"Eclectic Drizzle",palette:["#4A5568","#E2E8F0","#2D3748"]},
  Rome:{emoji:"🇮🇹",coords:{x:52,y:33},desc:"Bella figura at all costs. Rich fabrics, dark sunglasses, confidence of someone who has never been early.",looks:["Silk blouse + tailored pants + leather loafers","Linen suit (unbuttoned, naturally)","Wrap dress + strappy sandals"],vibe:"Dolce Vita",palette:["#C2714F","#8B2500","#F5DEB3"]},
  Lisbon:{emoji:"🇵🇹",coords:{x:38,y:35},desc:"Mediterranean ease. Linen everything, golden hour palettes, tiles that outshine your outfit anyway.",looks:["Linen shirt + wide trousers + espadrilles","Maxi dress + leather sandals","Stripe top + denim + white sneakers"],vibe:"Golden Hour Ease",palette:["#D4A853","#4A6741","#E8D5B0"]},
  NYC:{emoji:"🇺🇸",coords:{x:22,y:30},desc:"All-black everything, or absolutely unhinged. A floor-length fur coat is appropriate at 9am on a Tuesday.",looks:["All-black turtleneck + trousers + boots","Bold print dress + sneakers","Oversized blazer + bike shorts + loafers"],vibe:"Concrete Chaos",palette:["#1C1917","#C0C0C0","#2D3748"]},
  Tokyo:{emoji:"🇯🇵",coords:{x:80,y:32},desc:"Quiet luxury meets avant-garde. Immaculate layering, considered proportions, sneakers that cost more than rent.",looks:["Oversized coat + tapered pants + clean sneakers","Sheer layer + tank + wide trousers","Monochrome grey head-to-toe"],vibe:"Silent Precision",palette:["#E8E8E8","#2D2D2D","#8B7355"]},
  Seoul:{emoji:"🇰🇷",coords:{x:78,y:28},desc:"K-fashion energy: oversized silhouettes, pastel pops, and streetwear that doubles as art.",looks:["Oversized blazer + wide pants + platform shoes","Pastel co-ord + white sneakers","Mini skirt + layered knit + bucket hat"],vibe:"Soft Power Flex",palette:["#E8B4C8","#B8D4E8","#F0E8D0"]},
  Lagos:{emoji:"🇳🇬",coords:{x:47,y:42},desc:"Maximalist joy. Ankara prints, bold accessories, and colour confidence that makes the sun feel underdressed.",looks:["Ankara wrap dress + statement earrings","Agbada-inspired wide set + sandals","Printed co-ord + heels + bold bag"],vibe:"Maximum Colour",palette:["#E8A020","#CC3300","#006633"]},
  Mumbai:{emoji:"🇮🇳",coords:{x:65,y:38},desc:"Where Bollywood glam meets Bandra cool. Kurtas with sneakers, dupattas as scarves, and gold always.",looks:["Kurta + slim trousers + kolhapuri sandals","Sari with contemporary blouse + heels","Anarkali + statement jewellery"],vibe:"Bombay Glamour",palette:["#D4006A","#FFD700","#8B1A1A"]},
  Sydney:{emoji:"🇦🇺",coords:{x:84,y:50},desc:"Effortless beach-to-brunch energy. Linen, espadrilles, SPF 50, and a flat white. Done.",looks:["Linen shirt dress + sandals","Swim cover-up + denim + sneakers","Relaxed blazer + shorts + loafers"],vibe:"Harbour Breeze",palette:["#87CEEB","#F5DEB3","#2E8B57"]},
  Berlin:{emoji:"🇩🇪",coords:{x:51,y:23},desc:"Techno minimalism. Black is a lifestyle, not a colour choice. Functional, edgy, zero apologies.",looks:["All black everything","Cargo pants + graphic tee + chunky boots","Sleek trench + turtleneck + boots"],vibe:"Techno Minimalism",palette:["#1C1917","#3D3D3D","#C0C0C0"]},
  Marrakech:{emoji:"🇲🇦",coords:{x:44,y:37},desc:"Spice market sensory overload. Kaftans, babouche slippers, zellige tile patterns, and brass everything.",looks:["Kaftan + leather babouche + brass jewellery","Wide linen trousers + embroidered top","Djellaba-inspired coat + sandals"],vibe:"Souk Enchantment",palette:["#C2714F","#D4A853","#8B2500"]},
};

const QUIZ_QUESTIONS = [
  {q:"Your ideal Saturday?",options:[{a:"Market, coffee, slow walk",cities:["Paris","Lisbon","Marrakech"]},{a:"Gallery-hopping & ramen",cities:["Tokyo","Seoul","Berlin"]},{a:"Beach then brunch",cities:["Sydney","Lagos","Mumbai"]},{a:"City energy, nowhere plan",cities:["NYC","London","Rome"]}]},
  {q:"Pick a colour palette.",options:[{a:"Neutrals & beiges",cities:["Paris","Tokyo","Sydney"]},{a:"Bold & saturated",cities:["Lagos","Mumbai","Marrakech"]},{a:"All black",cities:["Berlin","NYC","London"]},{a:"Earth & terracotta",cities:["Rome","Lisbon","Marrakech"]}]},
  {q:"Your go-to silhouette?",options:[{a:"Tailored & structured",cities:["Paris","Rome","Seoul"]},{a:"Oversized & layered",cities:["Tokyo","Berlin","London"]},{a:"Flowy & relaxed",cities:["Lisbon","Sydney","Mumbai"]},{a:"Mixed & maximal",cities:["Lagos","Marrakech","NYC"]}]},
];

const SHOP_ITEMS = [
  {id:1,name:"Oversized Linen Blazer",brand:"COS",price:"£165",vibe:"Quiet Luxury",color:"#C8B89A",tags:["Tailored","Neutral","Versatile"]},
  {id:2,name:"Silk Bias-Cut Slip Dress",brand:"Arket",price:"£120",vibe:"Dolce Vita",color:"#D4A853",tags:["Silk","Evening","Minimal"]},
  {id:3,name:"Wide-Leg Ecru Trousers",brand:"& Other Stories",price:"£85",vibe:"Old Money Romance",color:"#E8E0D0",tags:["Wide-leg","Neutral","Office"]},
  {id:4,name:"Chunky Platform Loafers",brand:"Toteme",price:"£390",vibe:"Silent Precision",color:"#2D2D2D",tags:["Platform","Leather","Statement"]},
  {id:5,name:"Rust Linen Co-ord Set",brand:"Zara",price:"£79",vibe:"Golden Hour Ease",color:"#C2714F",tags:["Co-ord","Linen","Summer"]},
  {id:6,name:"Gold Sculptural Hoops",brand:"Mejuri",price:"£68",vibe:"Maximum Colour",color:"#D4A853",tags:["Gold","Statement","Earrings"]},
  {id:7,name:"Sheer Organza Maxi",brand:"Nanushka",price:"£280",vibe:"Avant-Garde Dark",color:"#1C1917",tags:["Sheer","Maxi","Evening"]},
  {id:8,name:"Printed Ankara Wrap Skirt",brand:"Studio 189",price:"£95",vibe:"Maximum Colour",color:"#E8A020",tags:["Print","Ankara","Wrap"]},
];

const FIT_CHECK_RESULTS = {
  "Casual day out":    {score:81,verdict:"Effortlessly cool",strengths:["Relaxed silhouette works well","Colour palette is cohesive"],improvements:["Layer a lightweight jacket for dimension","Swap trainers for a loafer to elevate"],stylistNote:"This look says 'I woke up like this' — and that's exactly the point.",cityVibe:"Lisbon",shopSuggestion:"An unstructured linen blazer in sand"},
  "Date night":        {score:88,verdict:"Magnetic. Keep going.",strengths:["Strong contrast between pieces","Silhouette is flattering and intentional"],improvements:["Add one statement jewellery piece","A heel or sleek boot would finish this perfectly"],stylistNote:"There's confidence here — now let the accessories do the talking.",cityVibe:"Rome",shopSuggestion:"Gold sculptural earrings"},
  "Work / office":     {score:84,verdict:"Polished with personality",strengths:["Tailoring reads as authoritative","Neutral tones keep it versatile"],improvements:["Introduce a subtle texture — knit, tweed or silk","A structured bag would complete the look"],stylistNote:"You dress like someone who has already been promoted.",cityVibe:"Paris",shopSuggestion:"A leather tote in cognac or black"},
  "Festival":          {score:79,verdict:"Almost there — push it",strengths:["You've committed to the vibe","Good use of layering"],improvements:["Add one maximalist accessory","More colour or print would elevate this"],stylistNote:"Festivals are the one place to go too far. Go further.",cityVibe:"Lagos",shopSuggestion:"A printed bucket hat or fringe crossbody"},
  "Evening event":     {score:91,verdict:"Arrived. Fully.",strengths:["Colour choice is sophisticated","Proportions are balanced and editorial"],improvements:["A sleek clutch would sharpen the look","Consider a subtle lip — the outfit earns it"],stylistNote:"You walk into a room and people wonder who you are. That's the goal.",cityVibe:"NYC",shopSuggestion:"A satin micro-bag in a deep jewel tone"},
  "Brunch":            {score:77,verdict:"Cute but needs a moment",strengths:["Relaxed and approachable energy","Good base pieces"],improvements:["A statement top or interesting print would spark the look","Accessorise more — bag and sunglasses minimum"],stylistNote:"Brunch is the most underrated fashion event. Dress accordingly.",cityVibe:"Sydney",shopSuggestion:"An oversized tortoiseshell sunglasses frame"},
  "Travel":            {score:83,verdict:"Stylishly practical",strengths:["Comfortable yet considered — rare","Good layering potential"],improvements:["Add a versatile scarf","Opt for a structured backpack over a tote"],stylistNote:"The best travel outfit looks intentional in every city you land in.",cityVibe:"Tokyo",shopSuggestion:"A lightweight longline trench coat"},
  "Formal":            {score:93,verdict:"Impeccable. Full stop.",strengths:["Formality is matched by elegance","Every piece earns its place"],improvements:["Ensure shoes are polished — the details are everything","A minimal watch or bracelet as the final touch"],stylistNote:"This is the look that gets remembered. Wear it like you know it.",cityVibe:"Paris",shopSuggestion:"A fine chain bracelet in gold or silver"},
};

const UNSPLASH_QUERIES = {
  "#2D3748":"tokyo street fashion outfit",
  "#C2714F":"paris street style fashion",
  "#718096":"lisbon minimal fashion outfit",
  "#1C1917":"berlin dark fashion street style",
};

const FeedImage = ({postId, color, outfit, photo}) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(!photo);
  useEffect(() => {
    if (photo) return;
    const q = encodeURIComponent(UNSPLASH_QUERIES[color] || "street style fashion outfit");
    fetch(`https://api.unsplash.com/photos/random?query=${q}&orientation=squarish&client_id=xMFHBFSBTBh2KdF5j8BpEdcQp6LNjL6bNJKdIfxidyo`)
      .then(r => r.json()).then(d => { if (d?.urls?.regular) setUrl(d.urls.regular); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);
  const src = photo || url;
  return (
    <div style={{width:"100%",height:"100%",background:color,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {src && <img src={src} alt="outfit" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>}
      {loading && <div style={{position:"absolute",width:28,height:28,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.25)",borderTopColor:"rgba(255,255,255,0.8)",animation:"spin 0.8s linear infinite"}}/>}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {src && (
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 100%)",pointerEvents:"none"}}/>
      )}
      {src && (
        <div style={{position:"absolute",bottom:12,left:12,display:"flex",flexWrap:"wrap",gap:5}}>
          {outfit.slice(0,3).map((item,i)=>(
            <span key={i} style={{background:"rgba(255,255,255,0.18)",backdropFilter:"blur(8px)",color:"#fff",borderRadius:20,padding:"4px 10px",fontSize:11,fontFamily:"'Outfit',sans-serif",fontWeight:500}}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
};

const Avatar = ({gradA, gradB, size=42, name=""}) => {
  const initials = name.split(" ").map(w=>w[0]||"").slice(0,2).join("").toUpperCase()||"?";
  const gid = `mg_${name.replace(/\s/g,"_")}_${size}`;
  const r = size/2;
  const fs = size*0.32;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{flexShrink:0,display:"block"}}>
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradA}/><stop offset="100%" stopColor={gradB}/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={size} height={size} rx={size*0.18} fill={`url(#${gid})`}/>
      <rect x={size*0.07} y={size*0.07} width={size*0.86} height={size*0.86} rx={size*0.12} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"/>
      <text x={r} y={r+fs*0.36} textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontWeight="500" fontSize={fs} fill="rgba(255,255,255,0.95)" letterSpacing={size*0.04}>{initials}</text>
    </svg>
  );
};

export default function FitApp() {
  const [screen, setScreen] = useState("onboarding");
  const [tab, setTab] = useState("feed");
  const [dark, setDark] = useState(false);
  const [posts, setPosts] = useState(INIT_POSTS);
  const [closet, setCloset] = useState(CLOSET_INIT);
  const [closetCat, setClosetCat] = useState("tops");
  const [following, setFollowing] = useState([1,2]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [showNewItem, setShowNewItem] = useState(false);
  const [newItem, setNewItem] = useState({name:"",category:"tops",photo:null});
  const [newPost, setNewPost] = useState({caption:"",location:"",photo:null});
  const [commentInputs, setCommentInputs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [quizStep, setQuizStep] = useState(-1);
  const [quizScores, setQuizScores] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [onboardStep, setOnboardStep] = useState(0);
  const [authName, setAuthName] = useState("Alex");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [outfitCanvas, setOutfitCanvas] = useState([]);
  const [userName, setUserName] = useState("Alex");
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [eventFilter, setEventFilter] = useState("All");
  const [aiEventSuggestion, setAiEventSuggestion] = useState(null);
  const [loadingEventAI, setLoadingEventAI] = useState(false);
  const [storyViewing, setStoryViewing] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(null);
  const [savedCollections, setSavedCollections] = useState({Inspo:[],DateNight:[]});
  const [fitCheckPhoto, setFitCheckPhoto] = useState(null);
  const [fitCheckOccasion, setFitCheckOccasion] = useState("Casual day out");
  const [fitCheckResult, setFitCheckResult] = useState(null);
  const [loadingFitCheck, setLoadingFitCheck] = useState(false);
  const [shopFilter, setShopFilter] = useState("All");
  const [shopSearch, setShopSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [shopPost, setShopPost] = useState(null);

  // ALL refs in one place
  const fitCheckPhotoRef = useRef();
  const newItemPhotoRef = useRef();
  const postImgRef = useRef();

  const dm = dark;
  const bg = dm ? T.dmBg : T.cream;
  const card = dm ? T.dmCard : "#fff";
  const border = dm ? T.dmBorder : T.border;
  const txt = dm ? "#F5F0EB" : T.dark;
  const muted = dm ? T.dmMuted : T.muted;

  const occasions = ["Casual day out","Date night","Work / office","Festival","Evening event","Brunch","Travel","Formal"];
  const shopVibes = ["All",...[...new Set(SHOP_ITEMS.map(i=>i.vibe))]];
  const filteredShop = SHOP_ITEMS.filter(i=>{
    const vm = shopFilter==="All"||i.vibe===shopFilter;
    const sm = !shopSearch.trim()||i.name.toLowerCase().includes(shopSearch.toLowerCase())||i.brand.toLowerCase().includes(shopSearch.toLowerCase());
    return vm&&sm;
  });

  const getUser = id => id===0
    ? {id:0,name:userName,handle:"alexfit",gradA:T.terra,gradB:T.terraDark,bio:"Building my wardrobe, one fit at a time.",followers:128,following:following.length}
    : USERS.find(u=>u.id===id);

  const toggleLike = id => setPosts(ps=>ps.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p));
  const toggleFollow = uid => setFollowing(f=>f.includes(uid)?f.filter(x=>x!==uid):[...f,uid]);
  const addComment = id => {
    const t=(commentInputs[id]||"").trim(); if(!t) return;
    setPosts(ps=>ps.map(p=>p.id===id?{...p,comments:[...p.comments,{user:"alexfit",text:t}]}:p));
    setCommentInputs(c=>({...c,[id]:""}));
  };
  const toggleCanvas = item => setOutfitCanvas(c=>c.find(x=>x.id===item.id)?c.filter(x=>x.id!==item.id):[...c,item]);
  const addItem = () => {
    if(!newItem.name.trim()) return;
    const emojis={tops:"👕",bottoms:"👖",shoes:"👟",accessories:"💍"};
    const colors={tops:"#E8D5C0",bottoms:"#B0C4D8",shoes:"#C8A882",accessories:"#D4B896"};
    setCloset(c=>({...c,[newItem.category]:[...c[newItem.category],{id:Date.now(),name:newItem.name,color:colors[newItem.category],emoji:emojis[newItem.category],photo:newItem.photo}]}));
    setNewItem({name:"",category:"tops",photo:null}); setShowNewItem(false);
  };
  const submitPost = () => {
    if(!newPost.caption.trim()) return;
    setPosts(ps=>[{id:Date.now(),userId:0,caption:newPost.caption,location:newPost.location||"Somewhere",time:"Just now",likes:0,liked:false,comments:[],outfit:outfitCanvas.map(x=>x.name),color:T.terra,photo:newPost.photo||null},...ps]);
    setNewPost({caption:"",location:"",photo:null}); setOutfitCanvas([]); setTab("feed");
  };
  const answerQuiz = cities => {
    const scores={...quizScores}; cities.forEach(c=>scores[c]=(scores[c]||0)+1); setQuizScores(scores);
    if(quizStep===QUIZ_QUESTIONS.length-1){const top=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];setQuizResult(top);setQuizStep(3);}
    else setQuizStep(q=>q+1);
  };
  const runFitCheck = () => {
    setLoadingFitCheck(true); setFitCheckResult(null);
    setTimeout(()=>{
      setFitCheckResult(FIT_CHECK_RESULTS[fitCheckOccasion]||FIT_CHECK_RESULTS["Casual day out"]);
      setLoadingFitCheck(false);
    }, 1200);
  };
  const planOutfitAI = event => {
    setLoadingEventAI(true); setAiEventSuggestion(null);
    const allItems = Object.values(closet).flat();
    setTimeout(()=>{
      setAiEventSuggestion({outfit:allItems.slice(0,3).map(i=>i.name),tip:`Perfect for ${event.vibe} energy.`,score:82});
      setLoadingEventAI(false);
    }, 1000);
  };

  // ── ONBOARDING ──
  if(screen==="onboarding"){
    const SLIDES=[
      {title:"Your Wardrobe,\nYour World.",sub:"The pinnacle of global fashion discovery.",bg:T.terra,emoji:"🌍"},
      {title:"Get a Fit Check\nFrom AI.",sub:"Upload any outfit. Get honest, expert styling feedback instantly.",bg:"#2D3748",emoji:"✦"},
      {title:"Shop the\nVibes You Love.",sub:"Discover pieces curated for your aesthetic. No ads, pure style.",bg:"#5C7A6B",emoji:"🛍"},
    ];
    const sl=SLIDES[onboardStep];
    return(
      <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:sl.bg,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"60px 32px 48px",boxSizing:"border-box"}}>
        <style>{fonts}</style>
        <div style={{fontSize:72,textAlign:"center"}}>{sl.emoji}</div>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:42,color:"#fff",fontWeight:500,lineHeight:1.15,whiteSpace:"pre-line",marginBottom:16}}>{sl.title}</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,color:"rgba(255,255,255,0.8)",lineHeight:1.6}}>{sl.sub}</div>
        </div>
        <div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:32}}>
            {SLIDES.map((_,i)=><div key={i} style={{width:i===onboardStep?24:6,height:6,borderRadius:3,background:i===onboardStep?"#fff":"rgba(255,255,255,0.4)",transition:"width 0.3s"}}/>)}
          </div>
          {onboardStep<SLIDES.length-1
            ?<button onClick={()=>setOnboardStep(s=>s+1)} style={{width:"100%",background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:12,padding:16,color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:600,cursor:"pointer"}}>Next →</button>
            :<div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={()=>setScreen("signup")} style={{width:"100%",background:"#fff",border:"none",borderRadius:12,padding:16,color:sl.bg,fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>Get Started</button>
              <button onClick={()=>setScreen("login")} style={{width:"100%",background:"transparent",border:"1px solid rgba(255,255,255,0.4)",borderRadius:12,padding:16,color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:15,cursor:"pointer"}}>I already have an account</button>
            </div>}
        </div>
      </div>
    );
  }

  // ── AUTH ──
  if(screen==="login"||screen==="signup"){
    return(
      <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:T.cream,padding:"60px 28px 40px",boxSizing:"border-box"}}>
        <style>{fonts}</style>
        <button onClick={()=>setScreen("onboarding")} style={{background:"none",border:"none",color:T.muted,fontFamily:"'Outfit',sans-serif",fontSize:13,cursor:"pointer",marginBottom:32}}>← Back</button>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:500,color:T.dark,marginBottom:6}}>{screen==="login"?"Welcome back.":"Join FIT."}</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:T.muted,marginBottom:36}}>{screen==="login"?"Log in to your wardrobe.":"Create your account."}</div>
        {screen==="signup"&&<div style={{marginBottom:16}}><label style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:T.muted,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Your Name</label><input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="e.g. Alex Rivera" style={{width:"100%",boxSizing:"border-box",border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",fontFamily:"'Outfit',sans-serif",fontSize:14,color:T.dark,background:"#fff",outline:"none"}}/></div>}
        <div style={{marginBottom:16}}><label style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:T.muted,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Email</label><input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="your@email.com" type="email" style={{width:"100%",boxSizing:"border-box",border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",fontFamily:"'Outfit',sans-serif",fontSize:14,color:T.dark,background:"#fff",outline:"none"}}/></div>
        <div style={{marginBottom:32}}><label style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:T.muted,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Password</label><input value={authPass} onChange={e=>setAuthPass(e.target.value)} placeholder="••••••••" type="password" style={{width:"100%",boxSizing:"border-box",border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",fontFamily:"'Outfit',sans-serif",fontSize:14,color:T.dark,background:"#fff",outline:"none"}}/></div>
        <button onClick={()=>{if(authName)setUserName(authName);setScreen("app");}} style={{width:"100%",background:T.terra,color:"#fff",border:"none",borderRadius:12,padding:16,fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:16}}>{screen==="login"?"Log In":"Create Account"}</button>
        <div style={{textAlign:"center",fontFamily:"'Outfit',sans-serif",fontSize:13,color:T.muted}}>{screen==="login"?"No account? ":"Already have one? "}<span onClick={()=>setScreen(screen==="login"?"signup":"login")} style={{color:T.terra,cursor:"pointer",fontWeight:600}}>{screen==="login"?"Sign up":"Log in"}</span></div>
      </div>
    );
  }

  // ── COMPONENTS ──
  const PostCard = ({post}) => {
    const u = getUser(post.userId);
    const [expanded, setExpanded] = useState(false);
    return(
      <div style={{marginBottom:2,background:card,borderBottom:`1px solid ${border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px"}}>
          <div onClick={()=>{setProfileUser(u);setTab("profile");}} style={{cursor:"pointer"}}><Avatar gradA={u.gradA} gradB={u.gradB} size={36} name={u.name}/></div>
          <div style={{flex:1}}>
            <div onClick={()=>{setProfileUser(u);setTab("profile");}} style={{fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13,color:txt,cursor:"pointer"}}>{u.name}</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,marginTop:1}}>📍 {post.location} · {post.time}</div>
          </div>
        </div>
        <div style={{width:"100%",aspectRatio:"1/1",overflow:"hidden",position:"relative",background:post.color}}>
          <FeedImage postId={post.id} color={post.color} outfit={post.outfit} photo={post.photo}/>
        </div>
        <div style={{padding:"10px 14px 0",display:"flex",alignItems:"center",gap:2}}>
          <button onClick={()=>toggleLike(post.id)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 8px 4px 0"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={post.liked?T.terra:"none"} stroke={post.liked?T.terra:txt} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button style={{background:"none",border:"none",cursor:"pointer",padding:"4px 8px 4px 0"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={txt} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
          <button onClick={()=>setShopPost(post)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 8px 4px 0"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={txt} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
          <button onClick={()=>setShowSaveModal(post.id)} style={{background:"none",border:"none",cursor:"pointer",marginLeft:"auto"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={savedPosts.includes(post.id)?txt:"none"} stroke={txt} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
        </div>
        <div style={{padding:"4px 14px 2px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,color:txt}}>{post.likes.toLocaleString()} likes</div>
        <div style={{padding:"0 14px 6px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,lineHeight:1.45}}>
          <span style={{fontWeight:600,marginRight:6}}>{u.handle}</span>
          {expanded||post.caption.length<=60?post.caption:post.caption.slice(0,60)+"…"}
          {post.caption.length>60&&<span onClick={()=>setExpanded(e=>!e)} style={{color:muted,cursor:"pointer",marginLeft:4}}>{expanded?"less":"more"}</span>}
        </div>
        <div style={{padding:"0 14px 8px",display:"flex",flexWrap:"wrap",gap:5}}>
          {post.outfit.map((item,i)=><span key={i} style={{background:dm?"#2C2825":T.terraLight+"44",color:T.terraDark,borderRadius:20,padding:"3px 10px",fontSize:11,fontFamily:"'Outfit',sans-serif",fontWeight:500}}>#{item.replace(/\s/g,"")}</span>)}
        </div>
        {post.comments.slice(0,2).map((c,i)=><div key={i} style={{padding:"0 14px 3px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt}}><span style={{fontWeight:600,marginRight:5}}>{c.user}</span>{c.text}</div>)}
        <div style={{padding:"8px 14px 14px",display:"flex",gap:8,alignItems:"center",borderTop:`1px solid ${border}`,marginTop:6}}>
          <Avatar gradA={T.terra} gradB={T.terraDark} size={26} name={userName}/>
          <input value={commentInputs[post.id]||""} onChange={e=>setCommentInputs(c=>({...c,[post.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addComment(post.id)} placeholder="Add a comment…" style={{flex:1,border:"none",background:"none",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,outline:"none"}}/>
          <button onClick={()=>addComment(post.id)} style={{background:"none",border:"none",color:T.terra,fontFamily:"'Outfit',sans-serif",fontSize:13,cursor:"pointer",fontWeight:700}}>Post</button>
        </div>
      </div>
    );
  };

  const Feed = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${border}`}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:500,color:txt,letterSpacing:-0.5}}>FIT</span>
        <button onClick={()=>setDark(d=>!d)} style={{background:"none",border:`1px solid ${border}`,borderRadius:20,padding:"5px 12px",fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,cursor:"pointer"}}>{dm?"☀ Light":"⏾ Dark"}</button>
      </div>
      <div style={{display:"flex",gap:12,padding:"14px 16px",overflowX:"auto",borderBottom:`1px solid ${border}`}}>
        {STORIES.map(s=>(
          <div key={s.user} onClick={()=>setStoryViewing(s.user)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",flexShrink:0}}>
            <div style={{width:56,height:56,borderRadius:12,background:`linear-gradient(135deg,${s.gradA},${s.gradB})`,padding:2.5,boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Avatar gradA={s.gradA} gradB={s.gradB} size={50} name={s.user}/>
            </div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:muted,width:56,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.label}</div>
          </div>
        ))}
      </div>
      {posts.map(post=><PostCard key={post.id} post={post}/>)}
    </div>
  );

  const FitCheck = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 14px",borderBottom:`1px solid ${border}`}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>Fit Check</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted,marginTop:2}}>Honest AI styling feedback on any outfit</div>
      </div>
      <div style={{padding:"20px 16px"}}>
        <div onClick={()=>fitCheckPhotoRef.current.click()} style={{width:"100%",aspectRatio:"1/1",borderRadius:18,border:`2px dashed ${fitCheckPhoto?T.terra:border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:16,overflow:"hidden",background:fitCheckPhoto?"transparent":dm?"#1C1917":T.terraLight+"22"}}>
          {fitCheckPhoto
            ?<img src={fitCheckPhoto} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            :<div style={{textAlign:"center",padding:24}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:muted,fontStyle:"italic",marginBottom:6}}>Tap to upload your outfit</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted,opacity:0.7}}>Photo optional — or just pick an occasion</div>
            </div>}
        </div>
        <input ref={fitCheckPhotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setFitCheckPhoto(ev.target.result);r.readAsDataURL(f);}}/>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Occasion</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
          {occasions.map(occ=><button key={occ} onClick={()=>setFitCheckOccasion(occ)} style={{background:fitCheckOccasion===occ?T.terra:card,color:fitCheckOccasion===occ?"#fff":txt,border:`1px solid ${fitCheckOccasion===occ?T.terra:border}`,borderRadius:20,padding:"7px 14px",fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer"}}>{occ}</button>)}
        </div>
        <button onClick={runFitCheck} disabled={loadingFitCheck} style={{width:"100%",background:loadingFitCheck?muted:`linear-gradient(135deg,${T.terra},${T.terraDark})`,color:"#fff",border:"none",borderRadius:14,padding:"15px",fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,cursor:loadingFitCheck?"default":"pointer",letterSpacing:0.5,marginBottom:24}}>
          {loadingFitCheck?"Analysing your fit…":"Get My Fit Check ✦"}
        </button>
        {fitCheckResult&&(
          <div style={{background:card,borderRadius:18,border:`1px solid ${border}`,overflow:"hidden",marginBottom:20}}>
            <div style={{background:`linear-gradient(135deg,${T.terraDark},${T.terra})`,padding:"20px 22px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,color:"#fff",fontWeight:500,lineHeight:1}}>{fitCheckResult.score}<span style={{fontSize:16,opacity:0.7}}>/100</span></div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"rgba(255,255,255,0.9)",marginTop:4,fontWeight:600}}>{fitCheckResult.verdict}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:5}}>City Vibe</div>
                <div style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"5px 12px",fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#fff",fontWeight:600}}>{CITY_STYLES[fitCheckResult.cityVibe]?.emoji||"✦"} {fitCheckResult.cityVibe}</div>
              </div>
            </div>
            <div style={{padding:"18px 20px"}}>
              <div style={{marginBottom:16}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>What's working</div>
                {fitCheckResult.strengths.map((s,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                    <div style={{width:18,height:18,borderRadius:"50%",background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Level it up</div>
                {fitCheckResult.improvements.map((imp,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                    <div style={{width:18,height:18,borderRadius:"50%",background:T.terraLight+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.terra} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,lineHeight:1.5}}>{imp}</span>
                  </div>
                ))}
              </div>
              <div style={{background:dm?"#2C2825":T.terraLight+"33",borderRadius:12,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Stylist's Note</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:txt,fontStyle:"italic",lineHeight:1.5}}>"{fitCheckResult.stylistNote}"</div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:card,border:`1px solid ${border}`,borderRadius:12,padding:"12px 14px"}}>
                <div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>Shop to elevate</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,fontWeight:600}}>{fitCheckResult.shopSuggestion}</div>
                </div>
                <button onClick={()=>setTab("shop")} style={{background:T.terra,color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Shop →</button>
              </div>
              <button onClick={()=>{setFitCheckResult(null);setFitCheckPhoto(null);}} style={{width:"100%",background:"none",border:`1px solid ${border}`,borderRadius:10,padding:"10px",fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted,cursor:"pointer",marginTop:12}}>Try another fit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Shop = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 14px",borderBottom:`1px solid ${border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>Shop</div>
          <div style={{background:dm?"#2C2825":T.terraLight+"44",borderRadius:20,padding:"4px 12px",fontFamily:"'Outfit',sans-serif",fontSize:11,color:T.terraDark,fontWeight:600}}>{wishlist.length} saved</div>
        </div>
        <input value={shopSearch} onChange={e=>setShopSearch(e.target.value)} placeholder="Search pieces, brands, vibes…" style={{width:"100%",boxSizing:"border-box",border:`1px solid ${border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,background:card,outline:"none",marginBottom:12}}/>
        <div style={{display:"flex",gap:6,overflowX:"auto"}}>
          {shopVibes.map(v=><button key={v} onClick={()=>setShopFilter(v)} style={{flexShrink:0,background:shopFilter===v?T.terra:card,color:shopFilter===v?"#fff":muted,border:`1px solid ${shopFilter===v?T.terra:border}`,borderRadius:20,padding:"6px 14px",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:shopFilter===v?600:400,cursor:"pointer"}}>{v}</button>)}
        </div>
      </div>
      <div style={{padding:"14px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {filteredShop.map(item=>{
          const inW=wishlist.includes(item.id);
          return(
            <div key={item.id} style={{background:card,borderRadius:16,border:`1px solid ${border}`,overflow:"hidden"}}>
              <div style={{height:110,background:item.color,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"rgba(255,255,255,0.25)",fontStyle:"italic",textAlign:"center",padding:"0 10px",lineHeight:1.2}}>{item.vibe}</div>
                <button onClick={()=>setWishlist(w=>inW?w.filter(x=>x!==item.id):[...w,item.id])} style={{position:"absolute",top:8,right:8,background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={inW?"#fff":"none"} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
              </div>
              <div style={{padding:"10px 12px 12px"}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,marginBottom:3}}>{item.brand}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,color:txt,marginBottom:5,lineHeight:1.3}}>{item.name}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,color:txt}}>{item.price}</div>
                  <button style={{background:T.terra,color:"#fff",border:"none",borderRadius:8,padding:"5px 10px",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600,cursor:"pointer"}}>View</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const OutfitBuilder = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 14px",borderBottom:`1px solid ${border}`}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>New Post</span>
      </div>
      <div onClick={()=>postImgRef.current.click()} style={{width:"100%",aspectRatio:"1/1",background:newPost.photo?"transparent":dm?"#1C1917":T.terraLight+"22",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",position:"relative",borderBottom:`1px solid ${border}`}}>
        {newPost.photo
          ?<img src={newPost.photo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          :<div style={{textAlign:"center",padding:24}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:muted,fontStyle:"italic",marginBottom:6}}>Tap to add your photo</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted,opacity:0.7}}>Square crop · your outfit, your world</div>
          </div>}
      </div>
      <input ref={postImgRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setNewPost(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f);}}/>
      <div style={{padding:"16px 16px 0"}}>
        <textarea value={newPost.caption} onChange={e=>setNewPost(p=>({...p,caption:e.target.value}))} placeholder="Write a caption…" rows={2} style={{width:"100%",boxSizing:"border-box",border:"none",borderBottom:`1px solid ${border}`,padding:"8px 0",fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:txt,background:"none",outline:"none",resize:"none",marginBottom:12}}/>
        <input value={newPost.location||""} onChange={e=>setNewPost(p=>({...p,location:e.target.value}))} placeholder="📍 Add location" style={{width:"100%",boxSizing:"border-box",border:"none",borderBottom:`1px solid ${border}`,padding:"8px 0",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,background:"none",outline:"none",marginBottom:16}}/>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Tag pieces from your closet</div>
        {["tops","bottoms","shoes","accessories"].map(cat=>(
          <div key={cat} style={{marginBottom:10}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,marginBottom:6,textTransform:"capitalize"}}>{cat}</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {closet[cat].map(item=>{
                const sel=outfitCanvas.find(x=>x.id===item.id);
                return<button key={item.id} onClick={()=>toggleCanvas(item)} style={{background:sel?T.terra:card,color:sel?"#fff":txt,border:`1px solid ${sel?T.terra:border}`,borderRadius:20,padding:"6px 12px",fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer"}}>{item.emoji} {item.name}</button>;
              })}
            </div>
          </div>
        ))}
        <button onClick={submitPost} disabled={!newPost.caption.trim()} style={{width:"100%",background:newPost.caption.trim()?`linear-gradient(135deg,${T.terra},${T.terraDark})`:muted,color:"#fff",border:"none",borderRadius:12,padding:"15px",fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,cursor:newPost.caption.trim()?"pointer":"default",marginTop:8,marginBottom:20,letterSpacing:0.5}}>Share to Feed →</button>
      </div>
    </div>
  );

  const Events = () => {
    const eventTypes=["All",...[...new Set(EVENTS.map(e=>e.type))]];
    const filteredEvents=eventFilter==="All"?EVENTS:EVENTS.filter(e=>e.type===eventFilter);
    return(
      <div style={{paddingBottom:80}}>
        <div style={{padding:"20px 20px 14px",borderBottom:`1px solid ${border}`}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>Events</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted,marginTop:2}}>Browse events · discover what to wear</div>
        </div>
        <div style={{display:"flex",gap:6,padding:"12px 16px",overflowX:"auto",borderBottom:`1px solid ${border}`}}>
          {eventTypes.map(t=><button key={t} onClick={()=>setEventFilter(t)} style={{flexShrink:0,background:eventFilter===t?T.terra:card,color:eventFilter===t?"#fff":muted,border:`1px solid ${eventFilter===t?T.terra:border}`,borderRadius:20,padding:"6px 14px",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:eventFilter===t?600:400,cursor:"pointer"}}>{t}</button>)}
        </div>
        {activeEvent?(
          <div style={{paddingBottom:20}}>
            <button onClick={()=>{setActiveEvent(null);setAiEventSuggestion(null);}} style={{background:"none",border:"none",color:muted,cursor:"pointer",padding:"14px 20px",fontFamily:"'Outfit',sans-serif",fontSize:13}}>← Back</button>
            <div style={{margin:"0 16px 16px",borderRadius:16,background:activeEvent.color,padding:"28px 22px 22px"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{activeEvent.type}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"#fff",fontWeight:500,lineHeight:1.2,marginBottom:4}}>{activeEvent.name}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:16}}>📍 {activeEvent.city} · {activeEvent.date}</div>
              <div style={{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 14px",marginBottom:12}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#fff",fontStyle:"italic"}}>{activeEvent.vibe}</div></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{activeEvent.tags.map((t,i)=><span key={i} style={{background:"rgba(255,255,255,0.15)",color:"#fff",borderRadius:20,padding:"4px 11px",fontSize:11,fontFamily:"'Outfit',sans-serif"}}>{t}</span>)}</div>
            </div>
            <div style={{margin:"0 16px 16px",background:card,borderRadius:14,border:`1px solid ${border}`,padding:18}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Dress Code</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,color:txt,lineHeight:1.65}}>{activeEvent.dressCode}</div>
            </div>
            <div style={{margin:"0 16px 16px",background:card,borderRadius:14,border:`1px solid ${border}`,overflow:"hidden"}}>
              <div style={{background:`linear-gradient(135deg,${T.terraDark},${T.terra})`,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#fff"}}>Plan My Outfit</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,0.75)"}}>Scans your closet for the best look</div></div>
                <span style={{fontSize:18,color:"#fff"}}>✦</span>
              </div>
              <div style={{padding:18}}>
                {!aiEventSuggestion&&!loadingEventAI&&<button onClick={()=>planOutfitAI(activeEvent)} style={{width:"100%",background:T.terra,color:"#fff",border:"none",borderRadius:10,padding:"12px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Scan My Closet →</button>}
                {loadingEventAI&&<div style={{textAlign:"center",padding:"16px 0",fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:muted,fontStyle:"italic"}}>Scanning your wardrobe…</div>}
                {aiEventSuggestion&&(
                  <div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase"}}>Suggested Look</div>
                      <div style={{background:T.terra,color:"#fff",borderRadius:20,padding:"3px 10px",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600}}>{aiEventSuggestion.score}% match</div>
                    </div>
                    {aiEventSuggestion.outfit.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,background:dm?"#2C2825":T.terraLight+"22",borderRadius:8,padding:"9px 12px",marginBottom:7}}><div style={{width:6,height:6,borderRadius:"50%",background:T.terra,flexShrink:0}}/><span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt}}>{item}</span></div>)}
                    {aiEventSuggestion.tip&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:muted,fontStyle:"italic",marginTop:10}}>💡 {aiEventSuggestion.tip}</div>}
                  </div>
                )}
              </div>
            </div>
            <div style={{margin:"0 16px"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>What People Are Wearing</div>
              {activeEvent.outfits.map((o,i)=>(
                <div key={i} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",gap:12}}>
                  <Avatar gradA={o.gradA} gradB={o.gradB} size={40} name={o.user}/>
                  <div style={{flex:1}}><div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,color:txt,marginBottom:3}}>@{o.user}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,lineHeight:1.45}}>{o.look}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,marginTop:6}}>♥ {o.likes}</div></div>
                </div>
              ))}
            </div>
          </div>
        ):(
          <div style={{padding:"14px 16px"}}>
            {filteredEvents.map(ev=>(
              <div key={ev.id} onClick={()=>{setActiveEvent(ev);setAiEventSuggestion(null);}} style={{borderRadius:16,background:ev.color,marginBottom:14,overflow:"hidden",cursor:"pointer"}}>
                <div style={{padding:"22px 20px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"4px 11px",fontFamily:"'Outfit',sans-serif",fontSize:10,color:"rgba(255,255,255,0.9)"}}>{ev.type}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,0.65)"}}>{ev.date}</div>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#fff",fontWeight:500,lineHeight:1.2,marginBottom:5}}>{ev.name}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"rgba(255,255,255,0.65)",marginBottom:14}}>📍 {ev.city}</div>
                  <div style={{background:"rgba(255,255,255,0.12)",borderRadius:8,padding:"7px 12px",display:"inline-block",fontFamily:"'Outfit',sans-serif",fontSize:11,color:"rgba(255,255,255,0.85)"}}>✦ {ev.vibe}</div>
                </div>
                <div style={{padding:"0 20px 16px",display:"flex",gap:5,flexWrap:"wrap"}}>
                  {ev.tags.slice(0,3).map((t,i)=><span key={i} style={{background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",borderRadius:20,padding:"3px 9px",fontSize:10,fontFamily:"'Outfit',sans-serif"}}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Explore = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 14px"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>Explore</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted}}>Tap a city · take the style quiz</div>
      </div>
      <div style={{margin:"0 16px 16px",borderRadius:18,overflow:"hidden",border:`1px solid ${border}`,background:"#1C1F2E"}}>
        <svg viewBox="0 0 380 220" style={{width:"100%",display:"block"}}>
          <defs>
            <radialGradient id="bgG" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#232840"/><stop offset="100%" stopColor="#141620"/></radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <rect width="380" height="220" fill="url(#bgG)"/>
          {[40,70,100,130,160,190].map(y=><line key={y} x1="0" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
          {[38,76,114,152,190,228,266,304,342].map(x=><line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
          <path d="M28 35 C40 28 60 30 72 38 C80 44 82 52 78 62 C74 72 68 80 62 88 C56 94 50 98 44 96 C36 92 28 84 22 72 C16 60 18 44 28 35Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          <path d="M68 108 C76 104 86 106 90 114 C94 122 92 134 86 144 C80 154 70 160 62 156 C54 152 50 140 52 128 C54 116 60 112 68 108Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          <path d="M158 32 C168 28 182 30 190 38 C196 44 196 54 190 60 C184 66 174 68 164 64 C154 60 150 50 152 40 C153 36 155 33 158 32Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          <path d="M166 72 C176 68 188 70 194 80 C200 90 200 106 196 120 C192 134 182 144 170 142 C158 140 152 128 152 114 C152 100 156 78 166 72Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          <path d="M196 24 C220 18 264 20 292 30 C312 38 322 50 318 64 C314 78 298 86 274 88 C250 90 224 84 206 72 C190 60 186 38 196 24Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          <path d="M290 130 C302 126 316 128 322 138 C328 148 326 162 316 168 C306 174 292 170 286 160 C280 150 280 136 290 130Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
          {Object.entries(CITY_STYLES).map(([city,cs])=>{
            const px=cs.coords.x*3.8, py=cs.coords.y*3.67, active=selectedCity===city;
            return(
              <g key={city} onClick={()=>setSelectedCity(city===selectedCity?null:city)} style={{cursor:"pointer"}}>
                {active&&<circle cx={px} cy={py} r="10" fill="none" stroke={T.terra} strokeWidth="0.8" opacity="0.4"/>}
                {active&&<circle cx={px} cy={py} r="14" fill="none" stroke={T.terra} strokeWidth="0.4" opacity="0.2"/>}
                <circle cx={px} cy={py} r={active?6:4} fill={active?T.terra:"rgba(194,113,79,0.35)"} filter={active?"url(#glow)":undefined}/>
                <circle cx={px} cy={py} r={active?3.5:2} fill={active?"#fff":T.terraLight}/>
                <text x={px} y={py-10} textAnchor="middle" fontSize="6" fontFamily="'Outfit',sans-serif" fontWeight={active?"700":"400"} fill={active?T.terraLight:"rgba(255,255,255,0.55)"} letterSpacing="0.3">{city}</text>
                {active&&<text x={px} y={py+18} textAnchor="middle" fontSize="5" fontFamily="'Outfit',sans-serif" fill={T.terraLight} letterSpacing="0.5" opacity="0.9">{cs.vibe}</text>}
              </g>
            );
          })}
          <text x="8" y="212" fontSize="7" fontFamily="'Cormorant Garamond',serif" fill="rgba(255,255,255,0.2)" fontStyle="italic">12 cities</text>
          <text x="372" y="212" fontSize="7" fontFamily="'Outfit',sans-serif" fill="rgba(255,255,255,0.2)" textAnchor="end" letterSpacing="1">FIT</text>
        </svg>
      </div>
      {selectedCity&&(
        <div style={{margin:"0 16px 16px",background:card,borderRadius:16,border:`1px solid ${border}`,overflow:"hidden"}}>
          <div style={{background:T.terra,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#fff",fontWeight:500}}>{CITY_STYLES[selectedCity].emoji} {selectedCity}</div>
            <div style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 10px",fontFamily:"'Outfit',sans-serif",fontSize:11,color:"#fff"}}>{CITY_STYLES[selectedCity].vibe}</div>
          </div>
          <div style={{padding:20}}>
            <div style={{display:"flex",gap:6,marginBottom:14}}>{CITY_STYLES[selectedCity].palette.map((c,i)=><div key={i} style={{width:24,height:24,borderRadius:6,background:c,border:`1px solid ${border}`}}/>)}</div>
            <p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,lineHeight:1.65,margin:"0 0 16px"}}>{CITY_STYLES[selectedCity].desc}</p>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Sample Looks</div>
            {CITY_STYLES[selectedCity].looks.map((look,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:T.terra,marginTop:5,flexShrink:0}}/>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt}}>{look}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{margin:"0 16px",background:card,borderRadius:16,border:`1px solid ${border}`,overflow:"hidden"}}>
        <div style={{background:dm?"#2C2825":T.terraLight+"66",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:txt}}>What's your city style?</div>
          {quizStep>=0&&quizStep<3&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted}}>{quizStep+1}/{QUIZ_QUESTIONS.length}</div>}
        </div>
        <div style={{padding:20}}>
          {quizStep===-1&&<><p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:muted,marginBottom:16}}>3 questions to find your aesthetic city.</p><button onClick={()=>{setQuizStep(0);setQuizScores({});}} style={{background:T.terra,color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Take the Quiz →</button></>}
          {quizStep>=0&&quizStep<3&&<div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:txt,marginBottom:16}}>{QUIZ_QUESTIONS[quizStep].q}</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{QUIZ_QUESTIONS[quizStep].options.map((opt,i)=><button key={i} onClick={()=>answerQuiz(opt.cities)} style={{background:card,border:`1px solid ${border}`,borderRadius:10,padding:"11px 16px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,cursor:"pointer",textAlign:"left"}}>{opt.a}</button>)}</div></div>}
          {quizStep===3&&quizResult&&<div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:8}}>{CITY_STYLES[quizResult].emoji}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:txt,marginBottom:4}}>{quizResult}</div><div style={{background:T.terra,borderRadius:20,padding:"4px 14px",display:"inline-block",fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#fff",marginBottom:14}}>{CITY_STYLES[quizResult].vibe}</div><p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:muted,lineHeight:1.6,marginBottom:16}}>{CITY_STYLES[quizResult].desc}</p><div style={{display:"flex",gap:8,justifyContent:"center"}}><button onClick={()=>setSelectedCity(quizResult)} style={{background:T.terra,color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer"}}>See on Map</button><button onClick={()=>{setQuizStep(-1);setQuizResult(null);}} style={{background:card,border:`1px solid ${border}`,borderRadius:10,padding:"9px 16px",fontFamily:"'Outfit',sans-serif",fontSize:12,color:txt,cursor:"pointer"}}>Retake</button></div></div>}
        </div>
      </div>
    </div>
  );

  const Closet = () => (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"20px 20px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,color:txt}}>My Closet</span>
        <button onClick={()=>setShowNewItem(true)} style={{background:T.terra,color:"#fff",border:"none",borderRadius:20,padding:"7px 16px",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add</button>
      </div>
      <div style={{display:"flex",borderBottom:`1px solid ${border}`,padding:"0 20px",marginBottom:20}}>
        {["tops","bottoms","shoes","accessories"].map(cat=><button key={cat} onClick={()=>setClosetCat(cat)} style={{background:"none",border:"none",borderBottom:closetCat===cat?`2px solid ${T.terra}`:"2px solid transparent",padding:"8px 10px",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:closetCat===cat?600:400,color:closetCat===cat?T.terra:muted,cursor:"pointer",textTransform:"capitalize"}}>{cat}</button>)}
      </div>
      <div style={{padding:"0 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {closet[closetCat].map(item=>(
          <div key={item.id} style={{borderRadius:14,overflow:"hidden",border:`1px solid ${border}`,background:card}}>
            {item.photo?<img src={item.photo} alt={item.name} style={{width:"100%",height:120,objectFit:"cover",display:"block"}}/>:<div style={{height:100,background:item.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{item.emoji}</div>}
            <div style={{padding:"10px 10px 12px",fontFamily:"'Outfit',sans-serif",fontSize:12,color:txt,lineHeight:1.3}}>{item.name}</div>
          </div>
        ))}
      </div>
      {showNewItem&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",zIndex:100}}>
          <div style={{background:bg,borderRadius:"20px 20px 0 0",padding:"28px 24px 48px",width:"100%",boxSizing:"border-box"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,marginBottom:20,color:txt}}>Add to Closet</div>
            <div onClick={()=>newItemPhotoRef.current.click()} style={{width:"100%",height:90,borderRadius:12,border:`2px dashed ${border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:14,overflow:"hidden",background:card}}>
              {newItem.photo?<img src={newItem.photo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted}}>Tap to add photo</span>}
            </div>
            <input ref={newItemPhotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setNewItem(n=>({...n,photo:ev.target.result}));r.readAsDataURL(f);}}/>
            <input value={newItem.name} onChange={e=>setNewItem(n=>({...n,name:e.target.value}))} placeholder="Item name" style={{width:"100%",boxSizing:"border-box",border:`1px solid ${border}`,borderRadius:8,padding:"10px 14px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,background:card,marginBottom:12,outline:"none"}}/>
            <select value={newItem.category} onChange={e=>setNewItem(n=>({...n,category:e.target.value}))} style={{width:"100%",border:`1px solid ${border}`,borderRadius:8,padding:"10px 14px",fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,background:card,marginBottom:20}}>
              {["tops","bottoms","shoes","accessories"].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
            </select>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowNewItem(false)} style={{flex:1,background:card,border:`1px solid ${border}`,borderRadius:8,padding:12,fontFamily:"'Outfit',sans-serif",fontSize:13,cursor:"pointer",color:muted}}>Cancel</button>
              <button onClick={addItem} style={{flex:1,background:T.terra,color:"#fff",border:"none",borderRadius:8,padding:12,fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Profile = () => {
    const u=profileUser||{id:0,name:userName,handle:"alexfit",gradA:T.terra,gradB:T.terraDark,bio:"Building my wardrobe, one fit at a time.",followers:128,following:following.length};
    const isMe=!profileUser;
    const isFollowing=following.includes(u.id);
    const userPosts=posts.filter(p=>p.userId===u.id);
    return(
      <div style={{paddingBottom:80}}>
        {profileUser&&<div style={{padding:"16px 20px 0"}}><button onClick={()=>setProfileUser(null)} style={{background:"none",border:"none",color:muted,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:13}}>← Back</button></div>}
        {isMe&&<div style={{padding:"16px 20px 0",display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setDark(d=>!d)} style={{background:"none",border:`1px solid ${border}`,borderRadius:20,padding:"5px 12px",fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,cursor:"pointer"}}>{dm?"☀ Light":"⏾ Dark"}</button></div>}
        <div style={{padding:"16px 20px 20px",borderBottom:`1px solid ${border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
            <Avatar gradA={u.gradA} gradB={u.gradB} size={64} name={u.name}/>
            <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:txt,fontWeight:500}}>{u.name}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:muted}}>@{u.handle}</div></div>
          </div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:txt,marginBottom:14,lineHeight:1.55}}>{u.bio}</div>
          {quizResult&&isMe&&<div style={{background:T.terra,borderRadius:20,padding:"5px 14px",display:"inline-flex",alignItems:"center",gap:6,marginBottom:14}}><span style={{fontSize:14}}>{CITY_STYLES[quizResult]?.emoji}</span><span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:"#fff",fontWeight:600}}>{quizResult} · {CITY_STYLES[quizResult]?.vibe}</span></div>}
          <div style={{display:"flex",gap:24,marginBottom:14}}>{[["Posts",userPosts.length],["Followers",u.followers],["Following",u.following]].map(([label,val])=><div key={label}><div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:16,color:txt}}>{val}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted}}>{label}</div></div>)}</div>
          {!isMe&&<button onClick={()=>toggleFollow(u.id)} style={{background:isFollowing?card:T.terra,color:isFollowing?txt:"#fff",border:`1px solid ${isFollowing?border:T.terra}`,borderRadius:10,padding:"9px 28px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>{isFollowing?"Following ✓":"Follow"}</button>}
        </div>
        <div style={{padding:"16px 20px"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:muted,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>Posts</div>
          {userPosts.length===0&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:muted,fontStyle:"italic",textAlign:"center",paddingTop:20}}>No posts yet.</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2}}>
            {userPosts.map(post=>(
              <div key={post.id} style={{aspectRatio:"1/1",background:post.color,overflow:"hidden"}}>
                <FeedImage postId={post.id} color={post.color} outfit={post.outfit} photo={post.photo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TABS=[
    {id:"feed",label:"Feed",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>},
    {id:"events",label:"Events",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>},
    {id:"fitcheck",label:"Fit Check",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>},
    {id:"shop",label:"Shop",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>},
    {id:"explore",label:"Explore",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 010 18M3 12a15 15 0 0118 0M3 12h18M12 3v18"/></svg>},
    {id:"profile",label:"Profile",svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>},
  ];

  return(
    <div style={{maxWidth:420,margin:"0 auto",background:bg,minHeight:"100vh",fontFamily:"'Outfit',sans-serif",transition:"background 0.3s"}}>
      <style>{fonts}</style>
      {storyViewing&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"40px 24px 60px",maxWidth:420,margin:"0 auto",boxSizing:"border-box"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Avatar gradA={STORIES.find(s=>s.user===storyViewing)?.gradA||T.terra} gradB={STORIES.find(s=>s.user===storyViewing)?.gradB||T.terraDark} size={36} name={storyViewing}/>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:"#fff",fontWeight:600}}>@{storyViewing}</div>
            </div>
            <button onClick={()=>setStoryViewing(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",fontSize:26,cursor:"pointer",lineHeight:1}}>×</button>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <Avatar gradA={STORIES.find(s=>s.user===storyViewing)?.gradA||T.terra} gradB={STORIES.find(s=>s.user===storyViewing)?.gradB||T.terraDark} size={90} name={storyViewing}/>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"#fff",fontStyle:"italic",marginBottom:10}}>"{STORIES.find(s=>s.user===storyViewing)?.label} look"</div>
          </div>
          <button onClick={()=>setStoryViewing(null)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:14,color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:14,cursor:"pointer"}}>Close</button>
        </div>
      )}
      {showSaveModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",zIndex:150}}>
          <div style={{background:bg,borderRadius:"20px 20px 0 0",padding:"24px 24px 48px",width:"100%",maxWidth:420,boxSizing:"border-box"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:txt,marginBottom:16}}>Save to Collection</div>
            {Object.keys(savedCollections).map(name=>(
              <button key={name} onClick={()=>{setSavedCollections(sc=>({...sc,[name]:[...new Set([...sc[name],showSaveModal])]}));setSavedPosts(s=>[...new Set([...s,showSaveModal])]);setShowSaveModal(null);}} style={{width:"100%",background:card,border:`1px solid ${border}`,borderRadius:10,padding:"12px 16px",fontFamily:"'Outfit',sans-serif",fontSize:14,color:txt,cursor:"pointer",marginBottom:8,textAlign:"left"}}>📁 {name}</button>
            ))}
            <button onClick={()=>setShowSaveModal(null)} style={{width:"100%",background:"none",border:"none",color:muted,fontFamily:"'Outfit',sans-serif",fontSize:13,cursor:"pointer",marginTop:6}}>Cancel</button>
          </div>
        </div>
      )}
      {tab==="feed"&&<Feed/>}
      {tab==="events"&&<Events/>}
      {tab==="fitcheck"&&<FitCheck/>}
      {tab==="shop"&&<Shop/>}
      {tab==="explore"&&<Explore/>}
      {tab==="profile"&&<Profile/>}
      {tab==="outfits"&&<OutfitBuilder/>}
      {tab==="closet"&&<Closet/>}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:dm?"#1A1614":"#FDF6EE",borderTop:`1px solid ${dm?"#2C2420":"#EDE3D8"}`,display:"flex",zIndex:50,boxShadow:"0 -6px 28px rgba(194,113,79,0.10)",padding:"6px 0 10px"}}>
        {TABS.map(t=>{
          const active=tab===t.id;
          return(
            <button key={t.id} onClick={()=>{setTab(t.id);if(t.id==="profile")setProfileUser(null);}} style={{flex:1,background:"none",border:"none",padding:"4px 0 2px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{display:"flex",alignItems:"center",justifyContent:"center",width:38,height:38,borderRadius:12,background:active?`linear-gradient(145deg,${T.terra},${T.terraDark})`:"transparent",boxShadow:active?"0 4px 14px rgba(194,113,79,0.45)":"none",color:active?"#fff":muted,transition:"all 0.25s ease"}}>{t.svg}</span>
              <span style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:active?T.terra:muted,fontWeight:active?700:400,letterSpacing:0.3}}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}