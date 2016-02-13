/* eslint key-spacing:0 */
export default (config) => ({
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash',
  compiler_source_maps     : false,
  compiler_public_path     : 'http://prashantpawar.github.io/blockapps-js-tutorial/',
  compiler_stats           : {
    chunks : true,
    chunkModules : true,
    colors : true
  }
})
