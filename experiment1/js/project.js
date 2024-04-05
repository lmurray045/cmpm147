// project.js - amazon email generator
// Author: Liam Murray
// Date: April 4, 2024

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

const fillers = {
  employee: ["Employee", "Sucker", "Associate", "'payed' Employee", "profit-bot", "Valued member of the Amazon Family", "'human being'"],
  department: ["Organ Harvesting", "Baby Punching", "Old Lady Purse-Stealing", "Tax Evasion", "Child Labor Exploiting", "Idea Stealing", "Theft", "Crime"],
  treatment: ["help", "serve", "exploit", "steal from", "assist", "aid", "prioritize"],
  push: ["pushing", "forcing", "commanding", "exploiting", "'asking'"],
  action: ["serve", "obey", "sacrifice themselves for", "wait on", "give their life savings to", "sacrifice their firstborne to", "cut of two (2) limbs for"],
  job: ["organ donor (mandatory)", "car pusher", "punching bag (for Jeff)", "crash test dummy", "rock pusher", "tax evader", "spittoon", "dung collector", "jester"],
  descriptor: ["important", "valuable", "useful", "objectively correct", "madatory", "predatory"],
  negative: ["horrible", "terrible", "awful", "tasteless", "disgusting", "miserable", "abhorent", "filthy", "gross", "yucky", "immoral", "irreverant"],
  nuclearexample: ["Sadam Hussein", "the Unabomber", "Ted Bundy", "Martin Shkreli", "the worst person ever concieved"],
  hrs: ["70", "80", "9 (hundred)", "90", "always", "6,000","589", "684", "332", "100"],
  pay: ["5.50", "0.17", "0.95", "4.32", "Good One!", "0.0001"],
  bezos: ["Jeffy :)", "Big J", "J-Dawg", "Daddy Bezos", "Jeff", "Bezos", "Jeff 'Deep Pockets' Bezos"]
};

const template = `Hello there $employee!\n\n

Welcome to Amazons $department department, where we $treatment our customers by $push our employees to $action them. You will be our $job! But before we get started, we have a $descriptor message to give you about unions.\n\n 

Here at Amazon, we are NOT anti-union, however we do think that they are $negative $negative $negative things and that employees who join them are worse than $nuclearexample. Anyway, Enjoy your time here time here!\n\n 

Hrs/week : $hrs\n
Pay/Hr: $pay\n\n

Sincerely,\n\n

$bezos
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);
}

/* global clicker */
$("#clicker").click(generate);

generate();


//main();