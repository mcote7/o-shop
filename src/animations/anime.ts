// export transitions global 
import { trigger, transition, style, animate, group, animateChild, query, stagger, keyframes } from '@angular/animations';

// global anime ( these are used in many places DO NOT modify an animation for single use, create a new one )

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(150, style({
            opacity: 1
        }))
    ])
]);

export const fadeInFast = trigger('fadeInFast', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(75, style({
            opacity: 1
        }))
    ])
]);

// fade in-out (:leave) GOOD *but with catch* - IF - ELEMENT IS CONDITIONALLY OCCUPYING SAME SPACE AS ANOTHER 
// YOU NEED TO DELAY OTHER ELEMENT FROM ENTERING DOM, THIS CAN BE DONE BY DECLARING A BOOL - 
// in .ts   - isAnimationRunning: bool; 
// in .html - (@someAnimation.start)="isAnimationRunning = true" 
//         && (@someAnimation.done)="isAnimationRunning = false" 
//   ON ELEMENT YOU WISH TO DELAY - 
// <someEl *ngIf="!isAnimationRunning && ect. "> </>  
// 
// THIS APPLYS TO ANY ANIME WITH A :leave transition <-----<<<|) 

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(200, style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1
        }),
        animate(150, style({
            opacity: 0
        }))
    ])
]);

export const fadeOutLong = trigger('fadeOutLong', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(10, style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1
        }),
        animate(1882, style({
            opacity: 0
        }))
    ])
]);

// 

export const slideInTop = trigger('slideInTop', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-1rem)'
        }),
        group([
            animate(200, style({
                opacity: 1
            })),
            animate(250, style({
                transform: 'translateY(0rem)'
            }))
        ])
    ])
]);

export const slideInBottom = trigger('slideInBottom', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(1rem)'
        }),
        group([
            animate(200, style({
                opacity: 1
            })),
            animate(250, style({
                transform: 'translateY(0rem)'
            }))
        ])
    ])
]);

export const slideInLeft = trigger('slideInLeft', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-1rem)'
        }),
        group([
            animate(100, style({
                opacity: 1
            })),
            animate(150, style({
                transform: 'translateX(0rem)'
            }))
        ])
    ])
]);

// 

// set transform-origin on element for this one rotateInOut 

export const rotateInOut = trigger('rotateInOut', [
    transition(':enter', [
        style({
            transform: 'rotate(70deg)',
            opacity: 0
        }),
        animate(200, style({
            transform: 'rotate(0deg)',
            opacity: 1
        }))
    ]),
    transition(':leave', [
        style({
            transform: 'rotate(0deg)',
            opacity: 1
        }),
        animate(150, style({
            transform: 'rotate(45deg)',
            opacity: 0
        }))
    ])
]);

// list stagger animation 

// decorate the element that WRAPS the *ngFor element with '@listAnimationWrap' set to variable if list is dynamic 
export const listAnimationWrap = trigger('listAnimationWrap', [
    transition('* => *', [
        query('@listAnimationItem', [
            stagger(162, [
                animateChild()
            ])
        ], { optional: true })
    ])
]);

// decorate the element that is also decorated with the *ngFor with '@listAnimationItem' 
export const listAnimationItem = trigger('listAnimationItem', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(192, style({
            opacity: 1
        }))
    ])
]);

// list stagger example 

// <div [@listAnimationWrap]="someList.length">
//     <div *ngFor="let i of someList" @listAnimationItem > this is the list item <div/>
// <div/>

// when the list is loaded the animation runs all items, if a new item is added that item is animated 

// 

// Toast notification Enter / Leave 

export const toastNotification = trigger('toastNotification', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'scale3d(0.8, 0.8, 0.8)'
        }),
        animate('200ms ease-in-out', keyframes([
            style({
                offset: .5,
                opacity: 0.9,
                transform: 'scale3d(1.1, 1.1, 1.1)'
            }),
            style({
                offset: 1,
                transform: 'scale3d(1, 1, 1)'
            })
        ]))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'scale3d(1, 1, 1)'
        }),
        animate('200ms ease-in', style({
            opacity: 0,
            transform: 'scale3d(0.4, 0.4, 0.4)'
        }))
    ])
]);

// pop in & popin delays
export const popin = trigger('popin', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('200ms ease-in-out', keyframes([
        style({
            offset: .5,
            opacity: 0.9,
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            transform: 'scale3d(1, 1, 1)'
        })
    ]))
  ])
]);
export const popinDelay = trigger('popinDelay', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('400ms ease-in-out', keyframes([
        style({
          offset: .3,
          opacity: 0,
          transform: 'scale3d(0.8, 0.8, 1)'
        }),
        style({
            offset: .5,
            opacity: 0.9,
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            transform: 'scale3d(1, 1, 1)'
        })
    ]))
  ])
]);
export const popinDelayLong = trigger('popinDelayLong', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('400ms ease-in-out', keyframes([
        style({
          offset: .4,
          opacity: 0,
          transform: 'scale3d(0.8, 0.8, 1)'
        }),
        style({
            offset: .5,
            opacity: 0.9,
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            transform: 'scale3d(1, 1, 1)'
        })
    ]))
  ])
]);

// special popin for increment button 
export const popinDelayIncrement = trigger('popinDelayIncrement', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('400ms ease-in-out', keyframes([
        style({
          offset: .1,
          opacity: 0,
          backgroundColor: '#e78c36',
          transform: 'scale3d(0.8, 0.8, 1) translateX(-4rem)'
        }),
        style({
            offset: .5,
            opacity: 0.9,
            backgroundColor: '#e78c36',
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            backgroundColor: '#fff',
            transform: 'scale3d(1, 1, 1) translateX(0rem)'
        })
    ]))
  ])
]);
// special popin for decrement button 
export const popinDelayDecrement = trigger('popinDelayDecrement', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('400ms ease-in-out', keyframes([
        style({
          offset: .1,
          opacity: 0,
          backgroundColor: '#e78c36',
          transform: 'scale3d(0.8, 0.8, 1) translateX(4rem)'
        }),
        style({
            offset: .5,
            opacity: 0.9,
            backgroundColor: '#e78c36',
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            backgroundColor: '#fff',
            transform: 'scale3d(1, 1, 1) translateX(0rem)'
        })
    ]))
  ])
]);
// special popin for handlebars 
export const popinDelayHandleBars = trigger('popinDelayHandleBars', [
  transition(':enter', [
    style({
        opacity: 0,
        transform: 'scale3d(0.8, 0.8, 1)'
    }),
    animate('400ms ease-in-out', keyframes([
        style({
          offset: .4,
          opacity: 0,
          transform: 'scale3d(0.8, 0.8, 1)'
        }),
        style({
            offset: .5,
            opacity: 0.9,
            transform: 'scale3d(1.1, 1.1, 1)'
        }),
        style({
            offset: 1,
            transform: 'scale3d(1, 1, 1)'
        })
    ]))
  ])
]);

// stagger for cards 🍇 

export const listAnimationWrapCard = trigger('listAnimationWrapCard', [
  transition('* => *', [
      query('@listAnimationItemCard', [
          stagger(232, [
              animateChild()
          ])
      ], { optional: true })
  ])
]);

export const listAnimationItemCard = trigger('listAnimationItemCard', [
  transition(':enter', [
      style({
          opacity: 0,
          transform: 'translateY(-1rem)'
      }),
      animate(262, style({
          opacity: 1,
          transform: 'translateY(0rem)'
      }))
  ])
]);

// ©️ cote 2021 👾 