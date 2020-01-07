import { computed } from "@ember/object";
import { getWithDefault } from "@ember/object";
import Controller from '@ember/controller';
import $ from "jquery";

export default Controller.extend({
    isInstructor: false,

    qaTextAreaFieldWidth: computed("isInstructor", "showNotebook", "showPresentations", "showStudentActivity", function() {
        if (this.isInstructor && this.showNotebook) {
            return "31";
        } else {
            return "59";
        }
    }),
    feedbackTextAreaFieldWidth: computed("isInstructor", "showQA", "showPresentations", "showStudentActivity", function() {
        if (this.isInstructor && this.showQA) {
            return "35";
        } else if (this.isInstructor && (!this.showQA || (!this.showPresentations && !this.showStudentActivity))) {
            return "59";
        } else {
            return "62";
        }
    }),

    emoji: null,
    emojiCode: null,
    presentation: null, // id, name, url, date

    question: null, // id, presentation, student-presenter-id, text, date
    response: null, // id, responder, questions, date, response, upvotes, presentation

    questionsAndResponses: computed("question", "question.length", "response", "response.length", function() {
        var question = getWithDefault(this, "question", []),
            responses = getWithDefault(this, "response", []),
            studentListener = getWithDefault(this, "studentListener", []);

        if (!responses) {
            return;
        }

        return question && question.map((item) => {
            var response = responses && responses.findBy("questions", item.id),
                responderObj = studentListener.findBy("id", response && response.responder),
                responder = responderObj && responderObj.username;

            return $.extend(item, {
                response: response,
                responder: responder
            });
        });
    }),

    responses: computed("response", "response.length", function() {

    }),

    star: null,
    studentListener: null,

    mockedListenerActivity: computed("studentListener", "studentListener.length", {
        get: function() {
            var studentListener = this.studentListener || [];

            return studentListener && studentListener.slice(0, 100)
                .map((item) => {
                    var activeStatus = (item.presentation % 5),
                        colorClass = activeStatus === 1 ? "active" :
                                activeStatus === 2 ? "idle" :
                                "inactive"; // 3
                    return {
                      username: item.username,
                      activeStatus: activeStatus,
                      class: `listener-activity-chart-${colorClass}`
                    }
                }).sortBy("activeStatus").reverse()
                .map((item, index) => {
                    return $.extend(item, {
                        alertButtonClasses: `listener-activity-alert-button listener-activity-alert-button-${index}`
                    });
                });
        },
        set: function(key, value) {
            return value && value.map((item) => {
                var colorClass = item.activeStatus === 1 ? "active" :
                            item.activeStatus === 2 ? "idle" :
                            "inactive"; // 3
                return {
                  username: item.username,
                  activeStatus: item.activeStatus,
                  class: `listener-activity-chart-${colorClass}`
                }
            }).sortBy("activeStatus").reverse()
            .map((item, index) => {
                return $.extend(item, {
                    alertButtonClasses: `listener-activity-alert-button listener-activity-alert-button-${index}`
                });
            });
        }
    }),

    studentPresenter: null, // id, firstName, LastName - there is no way to map Presentation to studentPresenter
    tableOfContents: null,
    tag: null,
    vote: null,

    isLoaded: computed("emoji", "emoji.length",
                        "emojiCode", "emojiCode.length",
                        "presentation", "presentation.length",
                        "question", "question.length",
                        "response", "response.length",
                        "star", "star.length",
                        "studentListener", "studentListener.length",
                        "studentPresenter", "studentPresenter.length",
                        "tableOfContents", "tableOfContents.length",
                        "tag", "tag.length",
                        "vote", "vote.length", function() {
        return this.emoji && //this.emoji.length > 0 &&
                this.emojiCode && //this.emojiCode.length > 0 &&
                this.presentation && //this.presentation.length > 0 &&
                this.question && //this.question.length > 0 &&
                this.response && //this.response.length > 0 &&
                this.star && //this.star.length > 0 &&
                this.studentListener && //this.studentListener.length > 0 &&
                this.studentPresenter && //this.studentPresenter.length > 0 &&
                this.tableOfContents && //this.tableOfContents.length > 0 &&
                this.tag && //this.tag.length > 0 &&
                this.vote; //&& this.vote.length > 0;
    }),

    showQA: true,
    showNotebook: true,
    showPresentations: true,
    showStudentActivity: true,

    showPresentationsDefault: computed("showQA", "showNotebook", "showPresentations", "showStudentActivity", function() {
        return this.showPresentations && this.showStudentActivity && (this.showQA || this.showNotebook);
    }),
    showPresentationsNoChart: computed("showPresentations", "showStudentActivity", function() {
        return this.showPresentations && !this.showStudentActivity;
    }),
    showStudentActivityDefault: computed("showQA", "showNotebook", "showPresentations", "showStudentActivity", function() {
        return this.showPresentations && this.showStudentActivity && (this.showQA || this.showNotebook);
    }),
    showChartNoPresentations: computed("showPresentations", "showStudentActivity", function() {
        return this.showStudentActivity && !this.showPresentations;
    }),

    showRightColumn: computed("showPresentations", "showStudentActivity", function() {
        return this.showPresentations || this.showStudentActivity;
    }),
    onlyRightColumn: computed("showQA", "showNotebook", "showRightColumn", function() {
        return !this.showQA && !this.showNotebook && this.showRightColumn;
    }),

    noPaneMessage: computed("displayingNoPanes", function() {
        var random = Math.floor(Math.random() * 7),
            noPaneMessage = null;

        if (this.displayingNoPanes) {
            switch(random) {
                case 0:
                    noPaneMessage = "Where we're going, we don't need feedback!";
                    break;
                case 1:
                    noPaneMessage = "I'm sorry, Ms. Rodriguez. I can't do that.";
                    break;
                case 2:
                    noPaneMessage = "What happened to all the windows?";
                    break;
                case 3:
                    noPaneMessage = "Would you look at that? It's clean."
                    break;
                case 4:
                    noPaneMessage = "You pressed all our buttons!";
                    break;
                case 5:
                    noPaneMessage = "No pane, no gain!";
                    break;
                case 6:
                    noPaneMessage = "There's nothing here!";
                    break;
                case 7:
                    noPaneMessage = "You made all our panes go away!";
                    break;
            }
        }

        return noPaneMessage;
    }),
    displayingNoPanes: computed("showQA", "showNotebook", "showPresentations", "showStudentActivity", function() {
        return !this.showQA && !this.showNotebook && !this.showPresentations && !this.showStudentActivity;
    }),

    showStudentWarning: false,
    actions: {
        toggleQA() {
            var that = this;

            if (this.showQA) {
                setTimeout(function() {
                  $(".questions-container").parent().slideUp(500);
                });

                setTimeout(function() { that.toggleProperty("showQA"); }, 1000);
            } else {
                that.toggleProperty("showQA");
            }
        },
        toggleNotebook() {
            var that = this;

            if (this.showNotebook) {
                setTimeout(function() {
                  $(".project-feedback-container").slideUp(500);
                });

                setTimeout(function() { that.toggleProperty("showNotebook"); }, 1000);
            } else {
                this.toggleProperty("showNotebook");
            }
        },
        togglePresentations() {
            var that = this;

            if (this.showPresentations) {
                setTimeout(function() {
                    $(".presentations-container").slideUp(500);
                });

                setTimeout(function() { that.toggleProperty("showPresentations"); }, 1000);
            } else {
                this.toggleProperty("showPresentations");
            }
        },
        toggleStudentActivity() {
            var that = this;

            if (this.showStudentActivity) {
                setTimeout(function() {
                    $(".listener-activity-chart-container").slideUp(500);
                });

                setTimeout(function() { that.toggleProperty("showStudentActivity"); }, 1000);
            } else {
                this.toggleProperty("showStudentActivity");
            }
        },
        toggleAllPanes() {
            this.setProperties({
                showQA: true,
                showNotebook: true,
                showPresentations: true,
                showStudentActivity: true
            });
        },
        alertStudent(index) {
            var that = this;
            setTimeout(function() {
                var mockedListenerActivity = that.mockedListenerActivity,
                    studentToNotify = mockedListenerActivity.get(index);

                studentToNotify.activeStatus = 1;

                that.set("mockedListenerActivity", mockedListenerActivity);
            }, 500);
        },
        flashStudentWarning: function() {
            var that = this;
            if (!this.isInstructor) {
                this.set("showStudentWarning", true);

                setTimeout(function() {
                    that.set("showStudentWarning", false);
                }, 5000);
            }
        }
    },

    checkFocus(that) {
        if (!document.hasFocus() && !that.isInstructor) {
            document.title = "Where'd you go?";
        } else {
            document.title = "Feedback Dashboard";
        }
    },

    init: function() {
        this._super();

        var that = this;
        setInterval( function() {
            that.checkFocus(that);
        }, 200 );
    }
});

// UI module updates:

// comments can have tags below the text field - tech, art, etc.
// questions should be mapped to course titles; have upvotes on answers? how does this work? Map visually from Q to A - Perhaps not.

// fade real-time comments to spare attention - No
//
//
// For the SL:
// Show students how many out of how many questions/responses they have - No
//
// Comments/discussion board and Q&A

// How does the design connect with human nature? (Working memory = 7 +- 2)
//
// Element differentiators: size, light/dark, copy
// Look at requirements for Instructor and Student Listener again. ***
//   Needs, empathy map too
//
// What is visual <-> verbal? Form/content?
