const prisma = require("./client");

async function main() {
  const author = await prisma.user.upsert({
    where: { email: "author@example.com" },
    update: {},
    create: {
      firstName: "Author",
      lastName: "User",
      email: "author@example.com",
      password: "hashedpassword123",
      role: "AUTHOR",
    },
  });

  const postsData = [
    {
      title: "Why Cats Make the Perfect Companions",
      content: `
Cats are mysterious, independent, and endlessly fascinating. From their playful pouncing to their quiet moments of affection, cats bring a unique kind of companionship to our lives. 

One of the most wonderful traits about cats is their ability to adapt. Whether you live in a small apartment or a large house, they find their cozy spots and make themselves at home. 

Plus, their low-maintenance nature makes them ideal for people with busy lifestyles. Unlike dogs, cats are often content entertaining themselves or curling up for a nap on a sunny windowsill. They also provide immense comfort — research even shows that the sound of a cat's purr can reduce stress and promote relaxation.

If you're looking for a pet who brings both charm and calm to your life, cats may be the perfect choice.
      `,
      isPublished: true,
    },
    {
      title: "The Joy of Having a Dog: More Than Just a Pet",
      content: `
Dogs are more than pets — they’re family. Known for their loyalty and unconditional love, dogs have an unmatched ability to sense our emotions and be there when we need them most. 

From morning walks to late-night cuddles, dogs bring joy into every part of our daily routines. They encourage us to stay active, explore the outdoors, and connect with others in our communities. 

Training a dog can be a rewarding experience too, strengthening the bond between you and your furry friend. And let’s not forget — the excitement of a wagging tail greeting you at the door after a long day is one of life’s simplest and purest joys.

Whether big or small, dogs have a way of making every day brighter.
      `,
      isPublished: true,
    },
    {
      title: "Cats vs Dogs: Which Pet Is Right for You?",
      content: `
Choosing between a cat and a dog can be a tough decision — and for good reason! Both bring different types of companionship and require different levels of care.

Cats tend to be more independent and require less day-to-day attention, making them ideal for people with busy or unpredictable schedules. Dogs, on the other hand, thrive on companionship, structure, and regular activity, which can be perfect for active individuals or families.

Before making a decision, consider your lifestyle, your space, and the kind of relationship you want with your pet. Whether it's the quiet purr of a cat or the enthusiastic bark of a dog, the right pet will bring happiness and love into your life.
      `,
      isPublished: false,
    },
  ];

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { authorId_title: { authorId: author.id, title: post.title } },
      update: { content: post.content, isPublished: post.isPublished },
      create: { ...post, authorId: author.id },
    });
  }

  const user = await prisma.user.upsert({
    where: { email: "dummy@example.com" },
    update: {},
    create: {
      firstName: "Jane",
      lastName: "Doe",
      email: "dummy@example.com",
      password: "hashedpassword456",
      role: "USER",
    },
  });

  const publishedPosts = await prisma.post.findMany({
    where: { authorId: author.id, isPublished: true },
  });

  for (const post of publishedPosts) {
    const existingComments = await prisma.comment.findMany({
      where: { postId: post.id, authorId: user.id },
    });

    if (existingComments.length < 2) {
      await prisma.comment.createMany({
        data: [
          {
            content: `I really enjoyed this article about ${post.title.toLowerCase()}. It felt very relatable!`,
            postId: post.id,
            authorId: user.id,
          },
          {
            content: `Great insights! I learned something new — looking forward to reading more like this.`,
            postId: post.id,
            authorId: user.id,
          },
        ].slice(existingComments.length),
      });
    }
  }

  console.log("Seed data upserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
