import { NbMenuItem } from '@nebular/theme';
import { title } from 'process';
import { link } from 'fs';

export var MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Vacancy',
    icon: 'bookmark',
    children: [
      {
        title: 'Add Vacancy',
        link: '/pages/vacancy/add-vacancy',
      },
      {
        title: 'List of Vacancy',
        link: '/pages/vacancy/list-of-vacancy',
      },
    ],
  },
  {
    title: 'Users',
    icon: 'people-outline',
    children: [
      {
        title: 'List of Users',
        link: '/pages/users/users-list',
      },
    ],
  },
  {
    title: 'Upload CV',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Upload Resume',
        link: '/pages/uploadResume/upload-resume',
      },
    ],
  },
  {
    title: 'Candidate',
    icon: 'person-outline',
    children: [
      {
        title: 'List of Candidate',
        link: '/pages/candidate/list-of-candidate',
      },
      {
        title: 'List of Confirmed Interview',
        link: '/pages/candidate/list-of-confirmed-interview',
      },
      {
        title: 'Interview Needs to Re-scheduled',
        link: '/pages/candidate/list-of-interview',
      },
    ],
  },

   {
    title: 'Level',
    icon: 'code-outline',
    children: [
      {
        title: 'Add Level',
        link: '/pages/level/add-level',
      },
    ],
  },
  {
    title: 'CV',
    icon: 'layers-outline',
    children: [
      {
        title: 'Total CV',
        link: '/pages/cv/list-of-cv',
      },
    ],
  },

  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];

if(sessionStorage.getItem('user_info'))
{
let use=sessionStorage.getItem('user_info');
let arr=use.split('["');
arr=arr[1].split('"]');
use=arr[0];

console.log(use);
console.log("User Information");

var vac,can,c,lvl,dash,usr;

if(use==='ROLE_HR')
{
  vac =
  {
    title: 'Opportunity',
    icon: 'bookmark',
    children: [

      {
        title: 'Opportunities',
        link: '/pages/vacancy/list-of-vacancy',
      },
    ],
  }
  
   can =
    {
      title: 'Candidate',
      icon: 'person-outline',
      children: [
        {
          title: 'Candidates',
          link: '/pages/candidate/list-of-candidate',
        },
        {
          title: 'Confirmed Interviews',
          link: '/pages/candidate/list-of-confirmed-interview',
        },
        {
          title: 'Interview Needs to Re-schedule',
          link: '/pages/candidate/list-of-interview',
        },
      ],
    }
  
    dash = {
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/pages/dashboard',
        home: true,
      }
  

  
  
      // export var uploadResume ={
      //   title: 'Upload Resume',
      //   icon: 'file-text-outline',
      //   children: [
      //     {
      //       title: 'Upload Resume',
      //       link: '/pages/uploadResume/upload-resume',
      //     },
      //   ],
    // }
  
     lvl ={
        title: 'Level',
        icon: 'file-text-outline',
        children: [
          {
            title: 'Add Level',
            link: '/pages/level/add-level',
          },
        ],
    }
  
     c ={
      title: 'Resume',
      icon: 'layers-outline',
      children: [
        {
          title: 'Total Resume',
          link: '/pages/cv/list-of-cv',
        },
        {
          title: 'Upload Resume',
          link: '/pages/uploadResume/upload-resume',
        }
      ],
  }
}
else if(use==='ROLE_PANEL')
{
  vac =
  {
    title: 'Opportunity',
    icon: 'bookmark',
    children: [
     
      {
        title: 'Opportunities',
        link: '/pages/vacancy/list-of-vacancy',
      },
    ],
  }
  
   can =
    {
      title: 'Candidate',
      icon: 'person-outline',
      children: [
        {
          title: 'Candidates',
          link: '/pages/candidate/list-of-candidate',
        },
        {
          title: 'Confirmed Interviews',
          link: '/pages/candidate/list-of-confirmed-interview',
        },
        
      ],
    }
  
    dash = {
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/pages/dashboard',
        home: true,
      }
  
      
  
  
      // export var uploadResume ={
      //   title: 'Upload Resume',
      //   icon: 'file-text-outline',
      //   children: [
      //     {
      //       title: 'Upload Resume',
      //       link: '/pages/uploadResume/upload-resume',
      //     },
      //   ],
    // }
  
  
  
   
  
 

}
else if(use==='ROLE_MODERATOR')
{
  vac =
  {
    title: 'Opportunity',
    icon: 'bookmark',
    children: [
      {
        title: 'Create Opportunity',
        link: '/pages/vacancy/add-vacancy',
        home: true,
      },
      {
        title: 'Opportunities',
        link: '/pages/vacancy/list-of-vacancy',
      },
    ],
  }
  
   can =
    {
      title: 'Candidate',
      icon: 'person-outline',
      children: [
        {
          title: 'Candidates',
          link: '/pages/candidate/list-of-candidate',
        },
        {
          title: 'Confirmed Interviews',
          link: '/pages/candidate/list-of-confirmed-interview',
        },
        
      ],
    }
  
    dash = {
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/pages/dashboard',
        home: true,
      }
  
   
  
  
      // export var uploadResume ={
      //   title: 'Upload Resume',
      //   icon: 'file-text-outline',
      //   children: [
      //     {
      //       title: 'Upload Resume',
      //       link: '/pages/uploadResume/upload-resume',
      //     },
      //   ],
    // }
  
     lvl ={
        title: 'Level',
        icon: 'file-text-outline',
        children: [
          {
            title: 'Add Level',
            link: '/pages/level/add-level',
          },
        ],
    }

   

}
else if(use==='ROLE_ADMIN'){
 vac =
{
  title: 'Opportunity',
  icon: 'bookmark',
  children: [
    {
      title: 'Create Opportunity',
      link: '/pages/vacancy/add-vacancy',
      home: true,
    },
    {
      title: 'Opportunities',
      link: '/pages/vacancy/list-of-vacancy',
    },
  ],
}

 can =
  {
    title: 'Candidate',
    icon: 'person-outline',
    children: [
      {
        title: 'Candidates',
        link: '/pages/candidate/list-of-candidate',
      },
      {
        title: 'Confirmed Interviews',
        link: '/pages/candidate/list-of-confirmed-interview',
      },
      {
        title: 'Interview Needs to Re-schedule',
        link: '/pages/candidate/list-of-interview',
      },
    ],
  }

  dash = {
      title: 'Dashboard',
      icon: 'grid-outline',
      link: '/pages/dashboard',
      home: true,
    }

    usr ={
        title: 'Users',
        icon: 'people-outline',
        children: [
          {
            title: 'Users',
            link: '/pages/users/users-list',
          },
        ],
    }


    // export var uploadResume ={
    //   title: 'Upload Resume',
    //   icon: 'file-text-outline',
    //   children: [
    //     {
    //       title: 'Upload Resume',
    //       link: '/pages/uploadResume/upload-resume',
    //     },
    //   ],
  // }

   lvl ={
      title: 'Level',
      icon: 'file-text-outline',
      children: [
        {
          title: 'Add Level',
          link: '/pages/level/add-level',
        },
      ],
  }

   c ={
    title: 'Resume',
    icon: 'layers-outline',
    children: [
      {
        title: 'Total Resume',
        link: '/pages/cv/list-of-cv',
      },
      {
        title: 'Upload Resume',
        link: '/pages/uploadResume/upload-resume',
      }
    ],
}
}
}
export var Vacancy=vac;

export var Candidate=can;
export var cv=c;
export var level=lvl;
export var dashboard=dash;
export var users=usr;

