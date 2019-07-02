----- CRAZY CABY -----

1. DESCRIPTION

The game consists of driving your cabify around Coast City, picking up customers and driving them to their destinations.

2. MVP (DOM - Deliverables)

The MVP will consist of:
    Driving the caby around Coast City
    Stopping if you touch a building
    Pickking up clients
    Dropping clients off at destinations
    Winning money
    Winning time
    Start game
    Game Over
    Restart game

3. BACKLOG
    Create Taxi Drivers
    Create Collisions with taxi drivers
        Subtract time
        Subtract Bank
    Design Coast City (make it look appealing)
    Music
    Sound Effects
    Client random position

4. DATA STRUCTURE

    main.js
        createSplashScreen()
        createGameScreen()
        createGameOverScreen()
        buildDom()
    
    Game.js
        this.checkTime()
        this.checkCollisionsAll()
        this.update()
        this.clear()
        this.startGame()
        this.checkBank()
        this.draw()
        startLoop()
    
    Caby.js
        this.x
        this.y
        this.speed
        this.direction
        this.width
        this.height
        this.move()
        this.draw()
        this.addTime()
        this.update()
        this.checkScreen()
        this.addDollars()
    
    Client.js
        this.x
        this.y
        this.width
        this.height
        this.draw()
        this.destiny

    Buildings.js
        this.x
        this.y
        this.width
        this.height
        this.draw()

5. STATES & STATES TRANSITIONS

3 States:

    splashScreen
        createGameScreen()
    
            gameScreen
                createGameOverScreen()
                    
                    gameOverScreen
                        createSplashScreen

                            splashScreen
                                ...

6. Tasks

The MVP will consist of:
    Creating files
    Create CSS
    Link the archives
    Set Git / GitHub
    Copy Boilerplates
    Creating the 3 screens
    Transitions between the screens
    Create Game Loop
    Create Caby
    Move Caby
    Create Buildings
    Collisions with buildings
    GameOver logic
    Create Clients
    Collisions with clientes
    Disappear clients
    Drop client to building
    Assign Destiny to client
    Add Time
    Add Bank

7. Links

GIT

SLIDES