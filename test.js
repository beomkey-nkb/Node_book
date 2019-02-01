// create
var poolCluster = mysql.createPoolCluster();

// add configurations (the config is a pool config object)
poolCluster.add(config); // add configuration with automatic name
poolCluster.add('MASTER', masterConfig); // add a named configuration
poolCluster.add('SLAVE1', slave1Config);
poolCluster.add('SLAVE2', slave2Config);

// remove configurations
poolCluster.remove('SLAVE2'); // By nodeId
poolCluster.remove('SLAVE*'); // By target group : SLAVE1-2

// Target Group : ALL(anonymous, MASTER, SLAVE1-2), Selector : round-robin(default)
poolCluster.getConnection(function (err, connection) {});

// Target Group : MASTER, Selector : round-robin
poolCluster.getConnection('MASTER', function (err, connection) {});

// Target Group : SLAVE1-2, Selector : order
// If can't connect to SLAVE1, return SLAVE2. (remove SLAVE1 in the cluster)
poolCluster.on('remove', function (nodeId) {
  console.log('REMOVED NODE : ' + nodeId); // nodeId = SLAVE1
});//

// A pattern can be passed with *  as wildcard
poolCluster.getConnection('SLAVE*', 'ORDER', function (err, connection) {});

// The pattern can also be a regular expression
poolCluster.getConnection(/^SLAVE[12]$/, function (err, connection) {});

// of namespace : of(pattern, selector)
poolCluster.of('*').getConnection(function (err, connection) {});

var pool = poolCluster.of('SLAVE*', 'RANDOM');
pool.getConnection(function (err, connection) {});
pool.getConnection(function (err, connection) {});
pool.query(function (error, results, fields) {});

// close all connections
poolCluster.end(function (err) {
  // all connections in the pool cluster have ended
});
