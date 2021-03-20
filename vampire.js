class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    while (vampire.creator) {
      if (vampire.creator === this) {
        return true;
      } else {
        vampire = vampire.creator;
      }
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const senior = this.isMoreSeniorThan(vampire);
    let seniorone, seniortwo;
    const ancestor = function(seniorone,seniortwo) {
      let junior =seniortwo;
      while (seniorone) {
        seniortwo = junior;
        while (seniortwo) {
          if (seniortwo === seniorone) {
            return seniorone;
          }
          seniortwo = seniortwo.creator;
        }
        seniorone = seniorone.creator;
      }
    };
    if (senior) {
      seniorone = this;
      seniortwo = vampire;
    } else {
      seniorone = vampire;
      seniortwo = this;
    }
    const output =  ancestor(seniorone,seniortwo);
    return output;
  }
}

module.exports = Vampire;

