const Discord = require("discord.js");
const client = new Discord.Client();
const TokenFile = require('./token.json');
const fs = require('fs');
const users = fs.readFileSync('users.json');
const mysql = require('mysql');

// 봇이 실행될 때의 명령어
client.on("ready", () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

class USER {
  constructor(id, role, points){
    this.id = id;
    this.role = role;
    this.points = points;
  };
  addPoints(){
    this.points + 1;
  };
};

const roleList = ['관리자','사용자'];
const scoreList = ['추가','감소'];

//합방등록 명령어
client.on("message", msg => {
  if(msg.content.startsWith('!') == false){
    return;
  }
  const args = msg.content.split(' ');
  if(msg.content.startsWith('!합방등록')){
    //유저 아이디 확인
    const userID = msg.author.id;
    //정해진 형식과 다를 때
    if(args.length != 3){
        msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방등록 *컨텐츠제목(띄어쓰기제외)* *인원수(숫자만입력)*');
        return;
    };
    //인원수가 숫자가 아닐 때
    if(isNaN(args[2])){
        msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방등록 *컨텐츠제목(띄어쓰기제외)* *인원수(숫자만입력)*');
        return;
    };
    //인원수가 2명 이하일 때
    if(args[2] < 2){
        msg.reply('합방 인원수는 2명 이상이어야 합니다.')
    }
    //메시지 보내기
    msg.channel.send(`<@&805341853435035649>\n***새로운 합방등록***\n등록자: <@${userID}> \n컨텐츠제목: ${args[1]}\n인원수: ${args[2]}명`);
    }
  //청소명령어
  if(msg.content.startsWith('!청소')){
    //청소 갯수가 없을 때
    if(args.length != 2){
        msg.reply('숫자를 입력해주세요.');
        return;
    };
    //갯수만큼 메시지 삭제
    msg.channel.bulkDelete(args[1]);
    //메시지 삭제 통보
    msg.reply(`메시지 ${args[1]}개가 삭제되었습니다.`);
  };
  //유저등록
  if(msg.content.startsWith('!유저등록')){
    if(args.length != 3){
      msg.reply('형식에 맞추어 등록해주세요.\n형식: !유저등록 *유저ID* *역할이름*');
      return;
    };
    if(isNaN(args[1])){
      msg.reply('형식에 맞추어 등록해주세요.\n형식: !유저등록 *유저ID* *역할이름* (아이디는 숫자여야합니다)');
      return;
    };
    if(roleList.includes(args[2])){
      const newUser = new USER(args[1],args[2],0)
      fs.writeFileSync('users.json', '{"id" :"' + newUser.id + '", "profile":[{ "role" :"' + newUser.role + '","point" :0}]}');
      msg.reply(`**신규유저등록 완료**\n유저아이디: ${newUser.id}\n역할: ${newUser.role}`)
    } else {
      msg.reply('유효한 역할을 입력해주세요.')
    }
  };

  if(msg.content.startsWith('!합방횟수')){
    const userJSON = JSON.parse(fs.readFileSync('users.json').toString());
    if(args.length != 3){
      msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방횟수 *유저ID* *추가/감소*');
      return;
    };
    if(isNaN(args[1])){
      msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방횟수 *유저ID* *추가/감소* (아이디는 숫자여야합니다)');
      return;
    };
    if(scoreList.includes(args[2])){
      if(userJSON.id != args[1]){
        msg.reply('유효하지 않은 유저입니다.');
        return;
      };
      msg.reply('작동성공');
      return;
    } else {
      msg.reply('추가/감소 둘 중 하나를 선택해주세요.');
      return;
    }
  }
  });


client.login(TokenFile.token);
