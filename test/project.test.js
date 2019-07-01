import sinon from 'sinon';
import controller from '../controllers/project.controller';

require('should');

process.env.ENV = 'Test';

const req = {
  body: null,
};
const res = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy(),
};

describe('Projects:', () => {
  describe('CREATE Project unit tests', () => {
    it('should not allow a request with an empty body', async () => {
      await controller.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });

    it('should not create a project without a name', async () => {
      req.body = { name: null };
      await controller.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });

    it('should not create a project with a name that is not a string', async () => {
      req.body = { name: 123 };
      await controller.create(req, res);
      res.status.calledWith(500).should.equal(true);
    });
  });

  describe('READ Projects unit tests', () => {
    it('should not allow a request with a project id that is not of type ObjectId', async () => {
      req.params = {
        id: 123,
      };

      await controller.read(req, res);
      res.status.calledWith(500).should.equal(true);
    });
  });
});
