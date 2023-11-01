import CourseRepository from "../../application/repository/CourseRepository";
import Course from "../../domain/Course";
import pgp from "pg-promise";

export default class CourseRepositoryDatabase implements CourseRepository {

	async get(courseId: string): Promise<Course> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [courseData] = await connection.query("select * from branas.course where course_id = $1", [courseId]);
		await connection.$pool.end();
		return new Course(courseData.courseId, courseData.title, parseFloat(courseData.amount));
	}

}
