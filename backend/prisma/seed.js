const prisma = require("./client"); // shared client

async function main() {
  // Upsert author
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

  // Upsert posts for the author
  const postsData = [
    {
      title: "Post One",
      content: "This is the content of post one",
      isPublished: true,
    },
    {
      title: "Post Two",
      content: "This is the content of post two",
      isPublished: true,
    },
    {
      title: "Post Three",
      content: "This is the content of post three",
      isPublished: false,
    },
  ];

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { authorId_title: { authorId: author.id, title: post.title } }, // uses your composite unique constraint
      update: { content: post.content, isPublished: post.isPublished },
      create: { ...post, authorId: author.id },
    });
  }

  // Upsert dummy user
  const user = await prisma.user.upsert({
    where: { email: "dummy@example.com" },
    update: {},
    create: {
      firstName: "Dummy",
      lastName: "User",
      email: "dummy@example.com",
      password: "hashedpassword456",
      role: "USER",
    },
  });

  // Fetch published posts after upsert
  const publishedPosts = await prisma.post.findMany({
    where: { authorId: author.id, isPublished: true },
  });

  // Add two comments per published post (but skip duplicates)
  for (const post of publishedPosts) {
    const existingComments = await prisma.comment.findMany({
      where: { postId: post.id, authorId: user.id },
    });

    if (existingComments.length < 2) {
      await prisma.comment.createMany({
        data: [
          {
            content: `First comment on ${post.title}!`,
            postId: post.id,
            authorId: user.id,
          },
          {
            content: `Second comment on ${post.title}!`,
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
