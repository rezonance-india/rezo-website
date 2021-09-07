import Typewriter from 'typewriter-effect/dist/core';

var typewriter = new Typewriter("#main-text");

typewriter
	.pauseFor(500)
	.changeDelay(75)
	.typeString('Rezo takes care of your Discord music needs')
	.pauseFor(2500)
	.deleteAll()
	.changeDelay(75)
	.typeString('Premium quality sound for FREE')
	.pauseFor(2500)
	.deleteAll()
	.changeDelay(500)
	.typeString("REZO")
	// .pauseFor(1000)
	// .deleteAll()
	// .typeString("REZO")
	.start();