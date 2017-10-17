## Flashr

A flashcard-based learning tool build using React Native. Featuring redux, push notifications, and questionable taste.

## Get started

Clone this repo to your local machine. Run `yarn install` then `yarn start`. Then follow the Expo instructions in your terminal.

## Minor deviations from rubric

There are three places where I made minor deviations from the rubric for UX reasons. I've listed them here to demonstrate they were deliberate choices, not mistakes.
 
 * First, the "Add Card" button is not in the main Deck view, but buried one layer deeper. It would be trivial to change this, but I think that the functionality belongs with the Edit Deck functionality that I also implemented.

 * Second, after completing a quiz the user is directed back to the Decks view rather than the view for the Deck they were just quizzed on. I think this makes more sense as a user flow, but I could add another button "Review Deck" if necessary.

 * Finally - and this may not be a deviation, depending on interpretation. Push notifications are only enabled once the user has completed their first quiz. I don't want to ask them to allow push notifications until they demonstrate that they wish to use the quiz functionality.

 ## Roadmap

 At some point, I plan to do the following, but they were not required for the project acceptance criteria:

 * Improve the styling on invalid form submissions

 * Add PropType checking to my components

 * Add some swipe handlers e.g. for flipping the cards in Quiz view or deleting them in Edit view

 * Make some of the buttons more buttony
