'use strict';

const questions = [
  { text: 'Ո՞րն է ձեր նախընտրած ծրագրավորման լեզուն:', type: 'radio', category: 'Տեխնոլոգիաներ', options: ['JavaScript', 'Python', 'C++', 'Java'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Քանի՞ տարվա աշխատանքային փորձ ունեք:', type: 'radio', category: 'Անձնական', options: ['0-1', '1-3', '3-5', '5+'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞ր հարթակն եք նախընտրում frontend-ի համար:', type: 'radio', category: 'Տեխնոլոգիաներ', options: ['React', 'Vue', 'Angular', 'Svelte'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Արդյոք օգտագործու՞մ եք TypeScript:', type: 'radio', category: 'Տեխնոլոգիաներ', options: ['Այո', 'Ոչ'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞ր տվյալների բազան եք առավել հաճախ օգտագործում:', type: 'radio', category: 'Տեխնոլոգիաներ', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Նշեք ձեր սիրելի IDE-ն:', type: 'text', category: 'Գործիքներ', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ի՞նչ օպերացիոն համակարգ եք օգտագործում:', type: 'radio', category: 'Գործիքներ', options: ['Windows', 'macOS', 'Linux'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Որքա՞ն հաճախ եք գրում թեստեր:', type: 'radio', category: 'Մասնագիտական', options: ['Միշտ', 'Հաճախ', 'Հազվադեպ', 'Երբեք'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Արդյոք օգտագործու՞մ եք Docker:', type: 'radio', category: 'Գործիքներ', options: ['Այո', 'Ոչ'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞րն է ամենակարևոր հատկանիշը ծրագրավորողի համար:', type: 'text', category: 'Մասնագիտական', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Որքա՞ն եք գնահատում ձեր գիտելիքները React-ում (1-10):', type: 'radio', category: 'Մասնագիտական', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞ր ամպային ծառայությունն եք նախընտրում:', type: 'radio', category: 'Գործիքներ', options: ['AWS', 'Google Cloud', 'Azure', 'Այլ'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞րն է վերջին տեխնոլոգիան, որը սովորել եք:', type: 'text', category: 'Տեխնոլոգիաներ', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Կցանկանայի՞ք աշխատել հեռավար:', type: 'radio', category: 'Անձնական', options: ['Այո', 'Ոչ', 'Հիբրիդային'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞րն է ամենադժվար խնդիրը, որ լուծել եք:', type: 'text', category: 'Մասնագիտական', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Օգտագործու՞մ եք AI գործիքներ ծրագրավորելիս:', type: 'radio', category: 'Գործիքներ', options: ['Այո', 'Ոչ'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ո՞րն է ձեր ամենասիրելի AI գործիքը:', type: 'text', category: 'Գործիքներ', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Ի՞նչ խորհուրդ կտաք սկսնակ ծրագրավորողներին:', type: 'text', category: 'Մասնագիտական', options: null, createdAt: new Date(), updatedAt: new Date() },
  { text: 'Որքա՞ն ժամանակ եք ծախսում ինքնակրթության վրա շաբաթական:', type: 'radio', category: 'Անձնական', options: ['0-2', '2-5', '5-10', '10+'], createdAt: new Date(), updatedAt: new Date() },
  { text: 'Արդյոք հաճախու՞մ եք IT միջոցառումների:', type: 'radio', category: 'Անձնական', options: ['Այո', 'Ոչ'], createdAt: new Date(), updatedAt: new Date() }
];

const participants = [
  { fullName: 'Արամ Խաչատրյան', email: 'aram@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Անի Հովհաննիսյան', email: 'ani@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Դավիթ Սարգսյան', email: 'david@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Մարիամ Մկրտչյան', email: 'mariam@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Տիգրան Գրիգորյան', email: 'tigran@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Լիլիթ Հակոբյան', email: 'lilit@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Հայկ Վարդանյան', email: 'hayk@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Սոնա Պետրոսյան', email: 'sona@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Արմեն Թորոսյան', email: 'armen@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Աննա Գևորգյան', email: 'anna@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Նարեկ Հարությունյան', email: 'narek@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Գոհար Կարապետյան', email: 'gohar@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Վարդան Մինասյան', email: 'vardan@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Տաթև Սիմոնյան', email: 'tatev@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Արթուր Բաղդասարյան', email: 'arthur@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Ալլա Աբրահամյան', email: 'alla@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Էդգար Խաչատրյան', email: 'edgar@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Նունե Դանիելյան', email: 'nune@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Գոռ Ավետիսյան', email: 'gor@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Ռուզաննա Մանուկյան', email: 'ruzanna@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Սամվել Եղիազարյան', email: 'samvel@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Քրիստինե Պողոսյան', email: 'kristine@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Արսեն Հովսեփյան', email: 'arsen@example.com', createdAt: new Date(), updatedAt: new Date() },
  { fullName: 'Նաիրա Մարտիրոսյան', email: 'naira@example.com', createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Questions', questions, {});

    await queryInterface.bulkInsert('Participants', participants, {});

    const insertedQuestions = await queryInterface.sequelize.query(
      `SELECT id, text, type, options from "Questions";`
    );
    const insertedParticipants = await queryInterface.sequelize.query(
      `SELECT id from "Participants";`
    );

    const questionRows = insertedQuestions[0];
    const participantRows = insertedParticipants[0];

    const results = [];

    const getTextAnswer = (text) => {
      if (text.includes('IDE')) return ['VS Code', 'WebStorm', 'IntelliJ IDEA', 'Vim'][Math.floor(Math.random() * 4)];
      if (text.includes('հատկանիշ')) return ['Տրամաբանություն', 'Թիմային աշխատանք', 'Արագ սովորելու ունակություն'][Math.floor(Math.random() * 4)];
      if (text.includes('վերջին տեխնոլոգիան')) return ['Next.js 14', 'Rust', 'GraphQL', 'Kubernetes'][Math.floor(Math.random() * 4)];
      if (text.includes('ամենադժվար խնդիրը')) return ['Արխիտեկտուրայի նախագծում', 'Օպտիմիզացիա', 'Բարդ բագի ուղղում', 'Ժառանգական (legacy) կոդի բարելավում'][Math.floor(Math.random() * 4)];
      if (text.includes('AI գործիքը')) return ['ChatGPT', 'GitHub Copilot', 'Claude', 'Gemini'][Math.floor(Math.random() * 4)];
      if (text.includes('խորհուրդ')) return ['Երբեք չհանձնվել', 'Շատ պրակտիկա անել', 'Կարդալ ուրիշների գրած կոդը', 'Միշտ թարմացնել գիտելիքները'][Math.floor(Math.random() * 4)];
      return 'Շատ հետաքրքիր հարց է:';
    };

    for (let i = 0; i < 30; i++) {
      const q = questionRows[Math.floor(Math.random() * questionRows.length)];
      const p = participantRows[Math.floor(Math.random() * participantRows.length)];

      let answer = '';
      if (q.type === 'text') {
        answer = getTextAnswer(q.text);
      } else {
        const opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
        answer = opts ? opts[Math.floor(Math.random() * opts.length)] : '';
      }

      results.push({
        questionId: q.id,
        participantId: p.id,
        answer: answer,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Results', results, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Results', null, {});
    await queryInterface.bulkDelete('Participants', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
