const Discord = require("discord.js");
const client = new Discord.Client();
const TokenFile = require('./token.json');

client.on("ready", () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

client.on("message", msg => {
  if(msg.content.startsWith('!합방등록')){
    const args = msg.content.split(' ');
    const userID = msg.author.id;
    if(args.length != 3){
        msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방등록 *컨텐츠제목(띄어쓰기제외)* *인원수(숫자만입력)*');
        return;
    };
    if(args[2] == NaN){
        msg.reply('형식에 맞추어 등록해주세요.\n형식: !합방등록 *컨텐츠제목(띄어쓰기제외)* *인원수(숫자만입력)*');
        return;
    };
    if(args[2] < 2){
        msg.reply('합방 인원수는 2명 이상이어야 합니다.')
    }
    msg.channel.send(`<@&805341853435035649>\n***새로운 합방등록***\n등록자: <@${userID}> \n컨텐츠제목: ${args[1]}\n인원수: ${args[2]}명`);
    }
  });

client.on("message", msg => {
  if(msg.content.startsWith('!청소')){
      const args = msg.content.split(' ');
      if(args.length != 2){
          msg.reply('숫자를 입력해주세요.');
          return;
      };
    msg.channel.bulkDelete(args[1]);
    msg.reply(`메시지 ${args[1]}개가 삭제되었습니다.`);
  }
});
client.login(TokenFile.token);