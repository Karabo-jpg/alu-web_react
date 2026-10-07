import React, { Component } from "react";
import { connect } from "react-redux";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import CourseShape from "./CourseShape";
import { StyleSheet, css } from "aphrodite";
import { fetchCourses, selectCourse, unSelectCourse } from "../actions/courseActionCreators";
import { getListCourses } from "../selectors/courseSelector";

export class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow(id, checked) {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  }

  render() {
    const { listCourses } = this.props;

    return (
      <table id="CourseList" className={css(styles.list)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {listCourses.length === 0 && (
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={false}
            />
          )}

          {listCourses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
              isChecked={course.isSelected}
              onChangeRow={this.onChangeRow.bind(this, course.id)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

CourseList.defaultProps = {
  listCourses: [],
  fetchCourses: () => {},
  selectCourse: () => {},
  unSelectCourse: () => {},
};

CourseList.propTypes = {
  listCourses: PropTypes.oneOfType([
    PropTypes.arrayOf(CourseShape),
    PropTypes.object, // for Immutable Map/List if they are not plain arrays
  ]),
  fetchCourses: PropTypes.func,
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
};

const cssVars = {
  borderTableColor: "rgb(170, 170, 170);",
};

const styles = StyleSheet.create({
  list: {
    border: `1px solid ${cssVars.borderTableColor}`,
    borderCollapse: "collapse",
    width: "95%",
    margin: "40px auto 0 auto",
  },
});

export const mapStateToProps = (state) => {
  return {
    listCourses: getListCourses(state),
  };
};

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
