class Message {
    constructor(text, time, writer) {
        this.text = text;
        this.time = time;
        this.writer = writer;
        this.Url = null;
        this.hasImg = false;
        this.hasVid = false;
        this.hasPhoto = false;
        this.hasRec = false;
    }
    setRec(url){
        this.hasRec = true;
        this.Url = url;
    }
    setImg(url){
        this.hasImg = true;
        this.Url = url;
    }
    setVid(url){
        this.hasVid = true;
        this.Url = url;
    }
    setPhoto(url){
        this.hasPhoto = true;
        this.Url = url;
    }
    
    get getUrl(){
        return this.Url;
    }
    get getHasRec(){
        return this.hasRec;
    }

    get getHasphoto(){
        return this.hasPhoto;
    }
    
    get getHasImg(){
        return this.hasImg;
    }
    
    get getHasVid(){
        return this.hasVid;
    }
   
    get getText(){
        return this.text;
    }
    get getTime(){
        return this.time;
    }
    get getWriter(){
        return this.writer;
    }
  
}

export default Message;