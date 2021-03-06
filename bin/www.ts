#!/usr/bin/env node

/**
 * Module dependencies.
 */
import jsonStore from '../lib/jsonStore'
import store from '../config/store'
import * as conf from '../config/app'
import app, { startServer } from '../app'

console.log(`
 ______                       _     ___                  _   _   
|___  /                      (_)   |__ \\                | | | |  
   / /_      ____ ___   _____ _ ___   ) |_ __ ___   __ _| |_| |_ 
  / /\\ \\ /\\ / / _\` \\ \\ / / _ \\ / __| / /| '_ \` _ \\ / _\` | __| __|
 / /__\\ V  V / (_| |\\ V /  __/ \\__ \\/ /_| | | | | | (_| | |_| |_ 
/_____|\\_/\\_/ \\__,_| \\_/ \\___| |___/____|_| |_| |_|\\__, |\\__|\\__|
                            _/ |                      | |        
                           |__/                       |_|        
`)

// jsonstore is a singleton instance that handles the json configuration files
// used in the application. Init it before anything else than start app.
// if jsonstore fails exit the application
jsonStore
	.init(store)
	.then(() => {
		/**
		 * Normalize a port into a number, string, or false.
		 */

		function normalizePort(val: string | number) {
			const port = typeof val === 'string' ? parseInt(val, 10) : val

			if (isNaN(port)) {
				// named pipe
				return val
			}

			if (port >= 0) {
				// port number
				return port
			}

			throw Error(`Port ${port} is not valid`)
		}

		/**
		 * Get port from environment and store in Express.
		 */

		const port = normalizePort(conf.port)
		app.set('port', port)

		return startServer(conf.host, port)
	})
	.catch((err: unknown) => {
		console.error(err)
		process.exit(1)
	})
