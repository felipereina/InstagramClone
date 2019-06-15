import React, { Component } from 'react';
import { Text, View, TextInput, FlatList,  KeyboardAvoidingView, Image } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addComment, getComments } from '../actions/post'
import moment from 'moment'


class Comment extends Component {
  
    state ={
        comment: ''
    }

    componentDidMount = () => {
        const { params } = this.props.navigation.state
        this.props.getComments(params)
    }

    postComment = () => {
        const { params } = this.props.navigation.state
        this.props.addComment(this.state.comment, params)
        this.setState({comment: ''})
    }

    render() {
        return (
        <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
            <FlatList
                keyExtractor = {(item) => JSON.stringify(item.date)}
                data = {this.props.post.comments}
                renderItem = { ({item}) => (
                    <View style={[styles.row, styles.space]}>
                        <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/>
                        <View style={[styles.container, styles.left]}>
                            <Text>{item.commenterName}</Text>
                            <Text>{item.comment}</Text>
                            <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                        </View>
                    </View>
                    )} />
            <TextInput
                style={styles.input}
                onChangeText={(comment) => this.setState({comment})}
                value={this.state.comment}
                returnKeyType='send'
                placeholder='Add Comment'
                onSubmitEditing={this.postComment}
            />
        </KeyboardAvoidingView>
        );
        }
    }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addComment, getComments }, dispatch)
}

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);