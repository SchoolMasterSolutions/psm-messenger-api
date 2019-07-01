import sinon from 'sinon';
import taskController from '../controllers/task.controller';

require('should');

process.env.ENV = 'Test';

const res = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy(),
};

describe('Tasks:', () => {
  describe('CREATE Task unit tests', () => {
    it('should not allow a request with an empty body', async () => {
      const req = {
        body: null,
      };

      await taskController.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });

    it('should not allow task with empty projectId', async () => {
      const req = {
        body: { projectId: null },
      };

      await taskController.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });

    it('should not allow task with certainty less than 50%', async () => {
      const req = {
        body: {
          projectId: 'e9e49bdf-82f3-40c8-8804-c80c2e9e7818',
          description: 'Add extra logging',
          research: 1.5,
          planning: 1.0,
          development: 4.0,
          testing: 1.0,
          stabilization: 2.0,
          certainty: 0.4,
          adjusted: 10.0,
          comment: null,
        },
      };

      await taskController.create(req, res);

      res.status.calledWith(500).should.equal(true);
    });

    it('should not allow task with certainty greater than 90%', async () => {
      const req = {
        body: {
          projectId: 'e9e49bdf-82f3-40c8-8804-c80c2e9e7818',
          description: 'Add extra logging',
          research: 1.5,
          planning: 1.0,
          development: 4.0,
          testing: 1.0,
          stabilization: 2.0,
          certainty: 0.97,
          adjusted: 10.0,
          comment: null,
        },
      };

      await taskController.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });
  });

  describe('READ Tasks unit tests', () => {
    it('should not allow requests without a projectId', async () => {
      const req = {
        params: {
          projectId: null,
        },
      };

      await taskController.findByProjectId(req, res);
      res.status.calledWith(500).should.equal(true);
    });
  });

  describe('UPDATE Task unit tests', () => {
    it('should not update a task without an id', async () => {
      const req = {
        params: {
          id: null,
        },
      };

      await taskController.update(req, res);
      res.status.calledWith(500).should.equal(true);
    });

    it('should not update a task without a valid id', async () => {
      const req = {
        params: {
          id: 'sample id',
        },
      };

      await taskController.update(req, res);
      res.status.calledWith(500).should.equal(true);
    });
  });

  // describe('Integration tests', () => {
  //   it('should allow a task to be posted and return a task with _id', (done) => {
  //     const task = {
  //       projectId: 'e9e49bdf-82f3-40c8-8804-c80c2e9e7818',
  //       description: 'Add extra logging',
  //       research: 1.5,
  //       planning: 1.0,
  //       development: 4.0,
  //       testing: 1.0,
  //       stabilization: 2.0,
  //       certainty: 0.7,
  //       adjusted: 10.0,
  //       comment: null,
  //     };

  //     agent
  //       .post('/api/task')
  //       .send(task)
  //       .expect(201)
  //       .end((err, results) => {
  //         results.status.should.equal(201);
  //         results.body.should.have.property('_id');

  //         done();
  //       });
  //   });

  //   afterEach((done) => {
  //     Task.deleteMany({}).exec();
  //     done();
  //   });
  // });
});
