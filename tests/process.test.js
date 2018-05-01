/* global describe, it */

const p = require('../util/process')
const assert = require('assert')

describe('dataForKPI', () => {
  it('takes data and aggregates', () => {
    const input = [{
      year: 2016,
      course: 'APBI 319',
      sectionStats: {
        count: {
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1
        }
      },
      enrolment: 5
    }, {
      year: 2016,
      course: 'APBI 319',
      sectionStats: {
        count: {
          1: 2,
          2: 2,
          3: 2,
          4: 2,
          5: 2
        }
      },
      enrolment: 10
    },
    {
      year: 2015,
      course: 'APBI 319',
      sectionStats: {
        count: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 5
        }
      },
      enrolment: 5
    }]

    const output = {
      currentYear: {
        umi6: 3,
        percentFavourable: 0.4,
        numCoursesTaught: 2,
        numStudentsTaught: 15
      },
      previousYear: {
        umi6: 5,
        percentFavourable: 1,
        numCoursesTaught: 1,
        numStudentsTaught: 5
      },
      lastYear: 2016
    }
    assert.deepEqual(p.dataForKPI(input), output)
  })
})

describe('dataForDepartmentStatistics', () => {
  it('takes data and determines ranking of PUID in most recent year', () => {
    const kpiData = {
      currentYear: {
        umi6: 4.5,
        percentFavourable: 0.4,
        numCoursesTaught: 2,
        numStudentsTaught: 15
      },
      previousYear: {
        umi6: 5,
        percentFavourable: 1,
        numCoursesTaught: 1,
        numStudentsTaught: 5
      },
      lastYear: 2016
    }

    const data = [{
      year: 2016,
      course: 'APBI 329',
      PUID: 'p1',
      UMI6: {
        count: {
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1
        }
      },
      enrolment: 5
    }, {
      year: 2016,
      course: 'APBI 319',
      PUID: 'p2',
      UMI6: {
        count: {
          1: 2,
          2: 2,
          3: 2,
          4: 2,
          5: 2
        }
      },
      enrolment: 10
    },
    {
      year: 2016,
      course: 'APBI 319',
      PUID: 'p3',
      UMI6: {
        count: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 5
        }
      },
      enrolment: 5
    },
    {
      year: 2016,
      course: 'APBI 319',
      PUID: 'p3',
      UMI6: {
        count: {
          1: 0,
          2: 0,
          3: 0,
          4: 5,
          5: 0
        }
      },
      enrolment: 5
    },
    {
      year: 2015,
      course: 'APBI 319',
      PUID: 'p3',
      UMI6: {
        count: {
          1: 5,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      },
      enrolment: 5
    }]

    const output = {
      deptRanking: 1,
      deptSize: 3
    }

    assert.deepEqual(p.dataForDepartmentStatistics(data, kpiData), output)
  })
})
