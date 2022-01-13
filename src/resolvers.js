const { students, prisma } =  require('./database.js');

const resolvers = {

    Profile: {
        id: (parent, args, context, info) => parent.id,
        studentId: (parent) => parent.studentId,
        name: (parent) => parent.name,
    },
    Student: {
        id: (parent, args, context, info) => parent.id,
        email: (parent) => parent.email,
        fullName: (parent) => parent.fullName,
        dept: (parent) => parent.dept,
        enrolled: (parent) => parent.enrolled,
        profile: (parent) => parent.profile,
      },

    Query: {
      enrollment: (parent, args) => {
        return prisma.student.findMany({where: {enrolled: true}})
      },
      students: (parent, args) => {
        return prisma.student.findMany(
            {
                include: {
                    profile: true
                }
            }
        )
      },
      profiles: (parent, args) => {
        return prisma.profile.findMany({})
      },
      student: (parent, args) => {
        return prisma.student.findFirst(
            {
                where: {
                    id: Number(args.id)
                },
                select: {
                    profile: true
                }
            }
        )
      },
    },

    Mutation: {
      registerStudent: (parent, args) => {
        const result = prisma.student.create({
            data: {
                email: args.content.email,
                fullName: args.content.fullName,
                dept: args.content.dept,
                profile: {
                    create: {
                        name: args.content.profile.name
                    }
                }
            }
        })
        console.log('result', result);
        return result;
      },
      enroll: (parent, args) => {
        return prisma.student.update(
            {
                where: {
                    id: Number(args.id)
                },
                data: {
                    enrolled: true
                }
            }
        )
      },
    },

  }


  module.exports = {
    resolvers,
  }