import Message from "./components/message";
import vid1 from "./cantWaitToBeKing.mp4";
import vid2 from "./song.mp4";
import vid3 from "./howParentsDrive.mp4";
import rec1 from "./bibi.mp3";

var chatList1 = [new Message("I am resigning", "8:00", "Idit Silman"), new Message("Huh?", "8:01", "Naftali Benet"),new Message("watch me", "8:02", "Idit Silman"),
new Message("wait a miniute", "8:03", "Naftali Benet"), new Message("lets talk about it", "8:03", "Naftali Benet"),
 new Message("you're making a terrible mistake", "8:03", "Naftali Benet"), new Message("shame on you", "13:05", "Naftali Benet")

]

var m10 = new Message("", "8:05", "Benjamin Netanyahu");
m10.setVid(rec1);

var chatList2 = [m10,
 new Message("welcome to the good side", "8:05", "Benjamin Netanyahu"),new Message("thank you!", "8:06", "Idit Silman"),
 new Message("now you ar afficially one of us", "8:07", "Benjamin Netanyahu"),
 new Message("All past issues between us are forgotton", "8:05", "Benjamin Netanyahu"),
 new Message("I assumed so", "14:07", "Idit Silman"),

];

var m1 =new Message("hahahaha", "8:05", "Benjamin Netanyahu");
m1.setImg('https://www.now14.co.il/wp-content/uploads/2022/04/7a16b706-eac7-471e-aa50-90ad4f8df162.jpg');
var m2 =new Message("", "14:00", "Benjamin Netanyahu");
m2.setVid(vid1);
// var m3= new Message("", "8:10", "Naftali Benet");
// m3.setRec()

var chatList3 = [m1, new Message("what are you smirking at", "8:06", "Naftali Benet"),
 new Message("you are going down baby", "8:06", "Benjamin Netanyahu"),
 new Message("nice try", "8:07", "Naftali Benet"),m2
];

var chatList4 = [new Message("This better not cause any problems","13:00","Mansour Abbas"),
new Message("I like my status things better stay the same you hear me","13:00","Mansour Abbas")
]

var chatList5 = [new Message("whats going on?","12:00","Yair Lapid"),
new Message("you promised i'd be prime minister too","12:00","Yair Lapid"),new Message("you promised","12:00","Yair Lapid"),
new Message("I promise a lot of things", "13:00", "Naftali Benet")
]

var m3 =new Message("","14:00","Bezalel Smotrich");
m3.setImg('https://ganlishomron.co.il/Cat_490560_6722.jpg');

 var m4=new Message("", "15:00", "Bezalel Smotrich");
 m4.setVid(vid2);

 var m5=new Message("", "17:00", "Bezalel Smotrich");
 m5.setVid(vid3);

var chatList6 = [m3, new Message("just in case you need it","14:01","Bezalel Smotrich"),
 new Message("explains everything you need to know","14:02","Bezalel Smotrich"),
new Message("thanks","14:04","Merav Michaeli"),m4, m5
]

var AllChats = {1: chatList1, 2: chatList2, 3: chatList3, 4:chatList4, 5: chatList5, 6:chatList6};

export default AllChats;

