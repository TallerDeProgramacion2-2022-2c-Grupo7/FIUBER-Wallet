const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const firebaseAuth = require("./middleware/auth");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
fastify
  .decorate("firebaseAuth", function (request, reply) {
    // your async validation logic
    return firebaseAuth(request, reply);
    // throws an error if the authentication fails
  })
  .register(require("@fastify/auth"))
  .after(() => {
    routes.forEach(route => fastify.route(route({ config, services, fastify })));
  });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
