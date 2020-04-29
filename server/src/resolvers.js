const { User }              = require('./models');

const resolvers = {
    Query: {
        user: async (_, args) => await User.findOne({_id:args.id}).exec(),
        users: async (_, args) => await User.find({}).skip(args.skip).limit(args.limit).exec(),
        countPagination: async () => await User.countDocuments({},function(count) { } ).exec()
    },
    Mutation: {
        createUser: async (_, args) => {
            if(!args.input.name || !args.input.email) throw new Error("required field is empty");
            try {
                return await User.create(args.input);
            } catch(e) {
                console.log(args);
                return e.message;
            }
        },
        updateUser: async (_, args) => {
            if(!args.input.name || !args.input.email) throw new Error("required field is empty");
            try {
                return await User.findOneAndUpdate(
                    {"_id": args.id},
                    { "$set":{name: args.input.name, email: args.input.email}},
                    {"new": true}
                );
            } catch(e) {
                return e.message;
            }
        },
        deleteUser: async (_, args) => {
            try {
                return await User.findOneAndDelete({"_id": args.id});
            } catch(e) {
                return e.message;
            }
        }
    }
};

module.exports = resolvers;